<template lang="pug">
div.rn-toast
    div.rn-invite-wrapper(v-if="request.length > 0")
        rn-invite(v-for="(query, key) in request" :key="key" :idx="key" :query="query" @clickClose="onClickClose(query.message.roomId)")
</template>

<script>
import { useStore } from 'vuex';
import { ref, watch, computed } from 'vue';

import RnInvite from './invite.vue';
import wsHandler from '../../js/websocket/handler.js';

export default {
    name: 'rn-toast',
    components: {
        RnInvite,
    },
    setup: function(props) {
        const store = useStore();

        const request = computed(() => store.getters['inviteToast']);

        const onClickClose = (roomId) => {
            wsHandler.sendRejectInvite(roomId);
        }

        const rejectInvite = computed(() => store.getters['rejectInviteAlertFirst']);
        watch(rejectInvite, (v) => {
            if (v == null) return;
            const msg = v.message
            const rej = store.state.rejectInviteAlert;
            // Warnings: must be delete by reverse order - indexing issue //
            for (let i = rej.length; i--; ) {
                const value = rej[i]
                if (value.message.roomId == msg.roomId) {
                    store.commit('deleteInviteToast', i);
                }
            }
            store.commit('popRejectInviteAlert');
        })
        
        return {
            request,
            onClickClose,
        };
    },
}
</script>

<style lang="scss" scoped>
.rn-toast {
    right: 100%;
    width: 100%;
    height: 100%;
    bottom: 100%;
    position: absolute;
}
.rn-invite-wrapper {
    top: 100%;
    z-index: 10;
    width: 350px;
    height: 60px;
    position: absolute;
    left: calc(150% - 175px);
}
</style>