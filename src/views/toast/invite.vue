<template lang="pug">
div.rn-invite
    div.invite-title
        rntxt(:init_message="title" :init_fontSize="16")
    div.invite-message
        rntxt(:init_message="message" :init_fontSize="16")
    button.accept-btn(@click="onClickAccept")
        rntxt(init_message="V" :init_fontSize="14")
    button.close-btn(@click="onClickClose")
        rntxt(init_message="X" :init_fontSize="14")
</template>

<script>
import { useI18n } from 'vue-i18n';
import { toRefs, computed } from 'vue';

import rntxt from '../components/rntxt.vue';

export default {
    name: 'rn-invite',
    components: {
        rntxt,
    },
    props: {
        query: {
            default: null,
        },
        idx: {
            defualt: -1,
        }
    },
    setup: function(props, {emit}) {
        const { query, idx } = toRefs(props);
        const { t } = useI18n();

        const onClickAccept = () => {
            window.location.href = `room?roomId=${query.value.message.roomId}`;
        }
        const onClickClose = () => {
            emit('clickClose');
        }

        const title = computed(() => {
            const msg = query.value.message;
            return `[${msg.roomName}] - [${msg.gameName}]`;
        });

        const message = computed(() => {
            const msg = query.value.message;
            return `"${msg.fromName}"${t('toast.invite.message')}`;
        });

        return {
            t,
            idx,
            query,
            title,
            message,
            onClickClose,
            onClickAccept,
        };
    },
}
</script>

<style lang="scss" scoped>
.rn-invite {
    width: 100%;
    margin-top: 8px;
    padding: 5px 10px;
    position: relative;
    box-sizing: border-box;
    height: calc(100% - 8px);
    background-color: #ececece0;
}
.accept-btn {
    top: 1px;
    padding: 0;
    width: 20px;
    height: 20px;
    right: -25px;
    position: absolute;
}
.close-btn {
    top: 26px;
    padding: 0;
    width: 20px;
    right: -25px;
    height: 20px;
    position: absolute;
}
</style>