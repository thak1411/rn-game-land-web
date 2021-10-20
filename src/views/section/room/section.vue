<template lang="pug">
div.room-section
    div.room-content
        div.room-title
            rntxt(:init_message="room.name" :init_fontSize="30")
        div.room-nav
            |navigation bar
        table.room-player
            thead
                tr
                    th
                        rntxt(:init_message="t('room.player') + `(${playerOnline}/${playerLength})`" :init_fontSize="16")
            tbody
                tr(v-for="(player, key) in room.player" :key="key")
                    td.player-name
                        rntxt(:init_message="player.name" :init_fontSize="16" :init_color="playerColor(player.isOnline)" @click="onClick(player.name)")
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { ref, computed, watch } from 'vue';

import gameApi from '../../../js/api/game.js';
import rntxt from '../../components/rntxt.vue';
import wsHandler from '../../../js/websocket/handler.js';

export default {
    name: 'room-section',
    components: {
        rntxt,
    },
    setup: function() {
        const { t } = useI18n();
        const store = useStore();
        var params = new URLSearchParams(window.location.search);
        const roomId = ref(params.get('roomId'));
        const room = ref({loading: true});

        setTimeout(() => {
            gameApi.getRoom(roomId.value)
            .then(res => {
                room.value = res.data;
                room.value.loading = false;
                wsHandler.sendJoinRoom(roomId.value);
            })
            .catch(err => {
                if (err.response.status == 401) {
                    alert(t('room.unauthorized'));
                } else {
                    alert(t('server_error'));
                }
                window.history.back();
            });
        }, 0);

        const wsJoinData = computed(() => store.getters['wsJoinFirst']);
        const wsLeaveData = computed(() => store.getters['wsLeaveFirst']);
        const wsInviteData = computed(() => store.getters['wsInviteFirst']);

        watch(wsJoinData, (v) => {
            let flag = 0;
            if (v == null) return;
            for (let i = room.value.player.length; i--; ) {
                const value = room.value.player[i];
                if (value.id == v.message.userId) value.isOnline = true;
                flag = 1;
            }
            if (flag) store.commit('setWsJoinData', null)
        });

        watch(wsLeaveData, (v) => {
            let flag = 0;
            if (v == null) return;
            for (let i = room.value.player.length; i--; ) {
                const value = room.value.player[i];
                if (value.id == v.message.userId) value.isOnline = false;
                flag = 1;
            }
            if (flag) store.commit('setWsLeaveData', null)
        });

        watch(wsInviteData, (v) => {
            if (v == null) return;
            room.value.player.push({
                id: v.message.userId,
                name: v.message.userName,
                isOnline: false,
            });
            store.commit('setWsInviteData', null)
        });

        const playerColor = computed(() => {
            return (isOnline) => {
                return isOnline ? '#000000' : '#00000030';
            };
        })
        const playerLength = computed(() => {
            if (!room.value.player) return 0;
            return room.value.player.length;
        })
        const playerOnline = computed(() => {
            if (!room.value.player) return 0;
            let cnt = 0;
            for (let i = room.value.player.length; i--; ) {
                const player = room.value.player[i];
                if (player.isOnline) ++cnt;
            }
            return cnt;
        })

        const onClick = (name) => {
            window.open(window.location.protocol + '//' + window.location.host + `/profile?name=${name}`)
        }

        return {
            t,
            room,
            onClick,
            wsJoinData,
            wsLeaveData,
            playerColor,
            wsInviteData,
            playerLength,
            playerOnline,
        };
    },
}
</script>

<style lang="scss" scoped>
.room-section {
    width: 100%;
}
.room-content {
    width: 100%;
    padding: 30px 25px;
    box-sizing: border-box;
}
.room-player {
    width: 100%;
    margin-top: 40px;
    border-collapse: collapse;

    td, th {
        height: 40px;
        padding: 8px 10px;
        box-sizing: border-box;
        border: 1px solid rgb(221, 221, 221);
    }
    td:nth-child(1) {
        width: 80px;
    }
    td:nth-child(3) {
        width: 220px;
    }
    th {
        text-align: left;
    }
    tbody tr:nth-child(2n - 1) {
        background-color: rgb(249, 249, 249);
    }
}
.player-name {
    span {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>