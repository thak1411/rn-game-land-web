<template lang="pug">
div.room-section
    div(v-if="room.loading")
        rntxt(:init_message="t('room.loading')")
    waitroom(v-else-if="!room.start" v-model:room="room" :inRoomUser="inRoomUser" :isFriend="isFriend")
    gameroom(v-else v-model:room="room")
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { ref, watch, computed } from 'vue';

import waitroom from './waitroom.vue';
import gameroom from './gameroom.vue';
import gameApi from '../../../js/api/game.js';
import rntxt from '../../components/rntxt.vue';
import wsHandler from '../../../js/websocket/handler.js';

export default {
    name: 'room-section',
    components: {
        rntxt,
        waitroom,
        gameroom,
    },
    setup: function() {
        const { t } = useI18n();
        const store = useStore();
        const room = ref({loading: true});
        var params = new URLSearchParams(window.location.search);
        const roomId = ref(params.get('roomId'));
        const inRoomUser = ref({});
        const isFriend = ref({});
        
        if (roomId.value == null) {
            window.location.href = '/';
            return;
        }

        setTimeout(() => {
            gameApi.getRoom(roomId.value)
            .then(res => {
                room.value = res.data;
                room.value.loading = false;
                wsHandler.sendJoinRoom(roomId.value);
                for (let i = res.data.player.length; i--; ) {
                    const value = res.data.player[i];
                    inRoomUser.value[value.id] = true;
                }
            })
            .catch(err => {
                if (err.response.status == 401) {
                    alert(t('room.unauthorized'));
                } else {
                    alert(t('server_error'));
                }
                window.location.href = '/';
            });
        }, 0);

        const joinAlert = computed(() => store.getters['joinAlertFirst']);
        watch(joinAlert, (v) => {
            let flag = 0;
            if (v == null) return;
            for (let i = room.value.player.length; i--; ) {
                const value = room.value.player[i];
                if (value.id == v.message.userId) value.isOnline = true;
                flag = 1;
            }
            if (flag) store.commit('popJoinAlert')
        });

        const leaveAlert = computed(() => store.getters['leaveAlertFirst']);
        watch(leaveAlert, (v) => {
            let flag = 0;
            if (v == null) return;
            for (let i = room.value.player.length; i--; ) {
                const value = room.value.player[i];
                if (value.id == v.message.userId) value.isOnline = false;
                flag = 1;
            }
            if (flag) store.commit('popLeaveAlert');
        });

        const inviteAlert = computed(() => store.getters['inviteAlertFirst']);
        watch(inviteAlert, (v) => {
            if (v == null) return;
            room.value.player.push({
                id: v.message.targetId,
                name: v.message.targetName,
                isOnline: false,
            });
            inRoomUser.value[v.message.targetId] = true;
            store.commit('popInviteAlert');
        });

        const rejectInvite = computed(() => store.getters['rejectInviteAlertFirst']);
        watch(rejectInvite, (v) => {
            if (v == null) return;
            const msg = v.message;
            for (let i = room.value.player.length; i--; ) {
                const value = room.value.player[i];
                if (value.id == msg.userId) {
                    inRoomUser.value[value.id] = false;
                    room.value.player.splice(i, 1);
                    break;
                }
            }
            store.commit('popRejectInviteAlert');
        });

        const newRoom = computed(() => store.getters['room']);
        watch(newRoom, (v) => {
            if (v == null) return;
            const msg = v.message;
            room.value = msg.room;
            store.commit('setNewRoom', null);
        })

        return {
            t,
            room,
            isFriend,
            inRoomUser,
        };
    },
}
</script>

<style lang="scss" scoped>
.room-section {
    width: 100%;
}
</style>