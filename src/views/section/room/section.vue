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
        table.invite-player
            thead
                tr
                    th
                        rntxt(init_message="#" :init_fontSize="16")
                    th
                        rntxt(:init_message="t('sdf')" :init_fontSize="16")
            tbody
                tr(v-for="(user, key) in filterdUserList" :key="key")
                    td
                        button(@click="onClickInvite(user.id)")
                            rntxt(init_message="<" :init_fontSize="14" :init_fontWeight="900")
                    td
                        rntxt(:init_message="user.name")
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { ref, computed, watch } from 'vue';

import userApi from '../../../js/api/user.js';
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
        const userList = ref([]);
        const inRoomUser = ref({});

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
                window.history.back();
            });
            userApi.getAllUser()
            .then(res => {
                userList.value = res.data;
            })
            .catch(err => {
                console.log('err', err);
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
            if (flag) store.commit('setWsLeaveData', null);
        });

        watch(wsInviteData, (v) => {
            if (v == null) return;
            room.value.player.push({
                id: v.message.userId,
                name: v.message.userName,
                isOnline: false,
            });
            inRoomUser.value[v.message.userId] = true;
            store.commit('setWsInviteData', null);
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
        const filterdUserList = computed(() => {
            let list = [];
            for (let i = userList.value.length; i--; ) {
                const value = userList.value[i];
                if (inRoomUser.value[value.id]) continue;
                list.push(value);
            }
            return list;
        })

        const onClick = (name) => {
            window.open(window.location.protocol + '//' + window.location.host + `/profile?name=${name}`)
        }

        const onClickInvite = (id) => {
            wsHandler.sendRoomInvite(room.value.id, id);
        }

        return {
            t,
            room,
            onClick,
            userList,
            inRoomUser,
            wsJoinData,
            wsLeaveData,
            playerColor,
            wsInviteData,
            playerLength,
            playerOnline,
            onClickInvite,
            filterdUserList,
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
    display: inline-block;
    box-sizing: border-box;
}
.room-player {
    width: 60%;
    float: left;
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
.room-nav {
    margin-bottom: 40px;
}
.invite-player {
    float: left;
    margin-left: 30px;
    box-sizing: border-box;
    width: calc(40% - 30px);
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
    th:nth-child(1), td:nth-child(1) {
        width: 40px;
    }
    tbody tr:nth-child(2n - 1) {
        background-color: rgb(249, 249, 249);
    }
}
</style>