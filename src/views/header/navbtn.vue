<template lang="pug">
button.nav-btn(@click="onClick" @mouseover="hover" @mouseleave="unhover")
    rntxt(:init_message="message" :init_color="color" :init_fontSize="18")
</template>

<script>
import rntxt from '../components/rntxt.vue';
import { computed, toRefs, ref } from 'vue';

export default {
    name: 'nav-btn',
    components: {
        rntxt,
    },
    props: {
        init_message: {
            default: "nav-btn",
        },
        init_href: {
            default: "/",
        },
    },
    setup: function(props) {
        const { init_message, init_href } = toRefs(props);
        const isHover = ref(false);

        const onClick = () => {
            window.location.href = init_href.value;
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
            color,
            hover,
            unhover,
            onClick,
            message: init_message,
        }
    },
}
</script>

<style lang="scss" scoped>
.nav-btn {
    width: 100px;
    height: 30px;
    border: none;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
}
.rn-txt {
    transition: all 0.25s;
}
</style>