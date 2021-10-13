<template lang="pug">
span.rn-txt(:style="style") {{ message }}
</template>

<script>
import Util from './js/util.js';
import { computed, toRefs } from 'vue';

export default {
    name: 'rn-txt',
    props: {
        init_message: {
            default: '',
        },
        init_color: {
            default: '#000000',
        },
        init_fontSize: {
            default: 12,
        },
        init_fontFamily: {
            default: 'AppleSdGothicNeo',
        },
        init_fontWeight: {
            default: 400,
        },
    },
    setup: function(props) {
        const { init_message, init_color, init_fontSize, init_fontFamily, init_fontWeight } = toRefs(props);
        
        const style = computed(() => {
            return {
                color: init_color.value,
                fontSize: Util.mU(init_fontSize.value),
                fontFamily: init_fontFamily.value,
                fontWeight: init_fontWeight.value
            }
        });
        return {
            style,
            message: init_message
        }
    },
}
</script>

<style lang="scss" scoped>
</style>