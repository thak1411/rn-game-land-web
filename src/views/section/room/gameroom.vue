<template lang="pug">
div.game-content
    div.room-title
        rntxt(:init_message="room.name" :init_fontSize="30")
    yahtzee(v-if="room.gameId == 0" v-model:room="room")
    death-bingo(v-else-if="room.gameId == 1" v-model:room="room")
    lucky-number(v-else-if="room.gameId == 2" v-model:room="room")
    div(v-else) 404
</template>

<script>
import Util from '../../components/js/util.js';
import rntxt from '../../components/rntxt.vue';
import yahtzee from './games/yahtzee/content.vue';
import deathBingo from './games/deathBingo/content.vue';
import luckyNumber from './games/luckyNumber/content.vue';

export default {
    name: 'game-index',
    components: {
        rntxt,

        yahtzee,
        deathBingo,
        luckyNumber,
    },
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
.game-content {
    width: 100%;
    padding: 30px 25px;
    margin-bottom: 15px;
    display: inline-block;
    box-sizing: border-box;
}
</style>