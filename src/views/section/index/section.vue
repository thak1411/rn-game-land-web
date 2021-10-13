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
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';

import rntxt from '../../components/rntxt.vue';

export default {
    name: 'index-section',
    components: {
        rntxt,
    },
    setup: function(props) {
        const { t } = useI18n();
        const isHover = ref(false);

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

        return {
            t,
            color,
            hover,
            unhover,
            onClick,
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
</style>