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
                        | 
                        rntxt.not-underline(v-if="player.id == room.owner" :init_message="`[${t('room.owner')}]`" :init_fontSize="10")
                        rntxt.not-underline(v-else :init_message="`[${t('room.player')}]`" :init_fontSize="10"  :init_color="playerColor(player.isOnline)")
        table.invite-player
            thead
                tr
                    th
                        rntxt(init_message="#" :init_fontSize="16")
                    th
                        rntxt(:init_message="t('room.users')" :init_fontSize="16")
            tbody
                tr(v-for="(user, key) in filterdUserList" :key="key")
                    td
                        button.user-append-btn(@click="onClickInvite(user.id, user.name)")
                            rntxt(init_message="+" :init_fontSize="16" :init_fontWeight="900")
                    td.player-name
                        rntxt(:init_message="user.name" @click="onClick(user.name)" :init_fontSize="16")
                        | 
                        rntxt.not-underline(v-if="isFriend[user.id]" :init_message="`[${t('room.friend')}]`" :init_fontSize="10")
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
        const isFriend = ref({});

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

        const userName = computed(() => store.getters['userName']);
        watch(userName, (v) => {
            if (v == '') return;
            setTimeout(() => {
                userApi.getFriend(store.state.user.name)
                .then(res => {
                    // friendList.value = res.data;
                    for (let i = res.data.length; i--; ) {
                        const value = res.data[i];
                        isFriend.value[value.id] = {
                            name: value.name,
                            username: value.username,
                        }
                    }
                })
                .catch(err => {
                    console.log('err', err);
                });
            }, 0);
        })

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
            list.sort((i, j) => {
                if (!isFriend.value[i.id] && !isFriend.value[j.id]) {
                    if (i.name < j.name) return -1;
                    return 1;
                }
                if (isFriend.value[i.id] && isFriend.value[j.id]) {
                    if (i.name < j.name) return -1;
                    return 1;
                }
                if (isFriend.value[i.id]) return -1;
                return 1;
            })
            return list;
        })

        const onClick = (name) => {
            window.open(window.location.protocol + '//' + window.location.host + `/profile?name=${name}`)
        }

        const onClickInvite = (id, name) => {
            if (room.value.owner != store.state.user.id) {
                alert(t('room.not_owner'));
                return
            }
            if (confirm('[' + name + ']' + t('room.is_invite'))) {
                wsHandler.sendRoomInvite(room.value.id, id);
            }
        }

        return {
            t,
            room,
            onClick,
            userList,
            isFriend,
            joinAlert,
            leaveAlert,
            inRoomUser,
            inviteAlert,
            playerColor,
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
    span:not(.not-underline) {
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
.user-append-btn {
    border: none;
    cursor: pointer;
    background: none;
}
</style>