<template lang="pug">
div.lucky-number
    |lucky-number
</template>

<script>
import { toRefs } from 'vue';

export default {
    name: 'game-lucky-number',
    props: {
        room: {
            default: {loading: true},
        },
    },
    setup: function(props) {
        const { room } = toRefs(props);

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