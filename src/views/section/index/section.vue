<template lang="pug">
div.index-section
    div.index-content
        rntxt(:init_message="t('index.title')" :init_fontSize="40" :init_fontWeight="900")
        br
        br
        rntxt(:init_message="t('index.sub_title')" :init_fontSize="26" :init_fontWeight="900")
        br
        br
        button.index-game(@click="onClick" @mouseover="hover" @mouseleave="unhover")
            rntxt(:init_message="t('index.go_game')" :init_fontSize="20" :init_color="color")
        br
        br
        hr
        div.index-chat
            div#context(ref="context")
                div.context-message(v-for="(chat, key) in chatList" :key="key")
                    rntxt(v-if="key + 1 == chatList.length" :init_message="`${chat.time}_[${chat.name}]: ${chat.message}`" :init_fontSize="14" ref="lastchat")
                    rntxt(v-else :init_message="`${chat.time}_[${chat.name}]: ${chat.message}`" :init_fontSize="14")
            div.row
                div.left
                    rninput(init_width="100%" :init_height="30" v-model="chat" @keypress.enter="onSubmit")
                div.right
                    button(@click="onSubmit") submit
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { ref, computed, watch } from 'vue';

import rntxt from '../../components/rntxt.vue';
import rninput from '../../components/rninput.vue';
import wsHandler from '../../../js/websocket/handler.js';

export default {
    name: 'index-section',
    components: {
        rntxt,
        rninput,
    },
    setup: function(props) {
        const { t } = useI18n();
        const store = useStore();
        const isHover = ref(false);
        const chat = ref('');
        const lastchat = ref(null);

        const onClick = () => {
            window.location.href = '/gamelist';
        };
        const hover = () => {
            isHover.value = true;
        }
        const unhover = () => {
            isHover.value = false;
        }

        const color = computed(() => {
            return isHover.value ? '#000000' : '#00000090';
        });

        const chatList = computed(() => store.getters.chatList);

        watch(lastchat, (v, ov) => {
            if (v != null) return;
            const context = document.querySelector('#context');
            context.scrollTo(0, context.scrollHeight);
        })

        const onSubmit = () => {
            // console.log('send', chat.value);
            wsHandler.sendPublicChat(chat.value);
            chat.value = '';
        }

        return {
            t,
            chat,
            color,
            hover,
            unhover,
            onClick,
            onSubmit,
            chatList,
            lastchat,
        };
    },
}
</script>

<style lang="scss" scoped>
.index-section {
    width: 100%;
}
.index-content {
    width: 100%;
    padding: 80px 30px;
    text-align: center;
    box-sizing: border-box;
}
.index-game {
    border: none;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
    span {
        transition: all 0.25s;
    }
}
.index-chat {
    width: 100%;
    height: 260px;
    margin-top: 30px;
    #context {
        width: 100%;
        height: 230px;
        overflow-y: auto;
    }
    .left {
        display: inline-block;
        width: calc(100% - 100px);
    }
    .right {
        width: 80px;
        display: inline-block;
    }
}
</style>