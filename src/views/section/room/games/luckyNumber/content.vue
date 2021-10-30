<template lang="pug">
div.lucky-number
    |lucky-number
</template>

<script>
import { toRefs } from 'vue';

import Util from '../../../../components/js/util.js';

export default {
    name: 'game-lucky-number',
    props: {
        room: {
            default: {loading: true},
        },
    },
    setup: function(props, {emit}) {
        const room = Util.modelIO(props, emit, 'room');

        return {
            room,
        };
    },
}
</script>

<style lang="scss" scoped>
.lucky-number {
    width: 100%;
}
</style>