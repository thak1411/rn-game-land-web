<template lang="pug">
input.rn-input(:type="type" :style="style" :maxlength="maxLength" :placeholder="placeHolder" v-model="value")
</template>

<script>
import Util from './js/util.js';

import { computed, toRefs } from 'vue';

export default {
    name: 'rn-input',
    props: {
        modelValue: {
            default: '',
        },
        init_type: {
            default: 'text',
        },
        init_color: {
            default: '#000000',
        },
        init_width: {
            default: 160,
        },
        init_height: {
            default: 19,
        },
        init_fontSize: {
            default: 12,
        },
        init_maxLength: {
            default: 100,
        },
        init_fontFamily: {
            default: 'AppleSdGothicNeo',
        },
        init_placeHolder: {
            default: '',
        },
    },
    setup: function(props, {emit}) {
        const { init_type, init_width, init_color, init_height, init_fontSize, init_maxLength, init_fontFamily, init_placeHolder } = toRefs(props);
        
        const style = computed(() => {
            return {
                color: init_color.value,
                width: Util.mU(init_width.value),
                height: Util.mU(init_height.value),
                fontSize: Util.mU(init_fontSize.value),
                fontFamily: init_fontFamily.value,
            }
        });
        const value = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        });

        return {
            style,
            value,
            type: init_type,
            maxLength: init_maxLength,
            placeHolder: init_placeHolder,
        };
    },
}
</script>

<style lang="scss" scoped>
.rn-input {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>