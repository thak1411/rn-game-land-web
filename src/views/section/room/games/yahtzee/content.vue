<template lang="pug">
div.yahtzee
    yahtzee-field(v-model:room="room")
    yahtzee-table(v-model:room="room")
</template>

<script>
import { useStore } from 'vuex';
import { toRefs, computed, watch } from 'vue';

import yahtzeeTable from './table.vue';
import yahtzeeField from './field.vue';
import Util from '../../../../components/js/util.js';

export default {
    name: 'game-yahtzee',
    components: {
        yahtzeeField,
        yahtzeeTable,
    },
    props: {
        room: {
            default: {loading: true},
        },
    },
    setup: function(props, {emit}) {
        const store = useStore();
        const room = Util.modelIO(props, emit, 'room');

        const rollSound = new Audio(require('./resource/rollDice.mp3'));

        const gameMessage = computed(() => store.getters['gameMessageFirst']);
        watch(gameMessage, (v) => {
            if (v == null) return;
            const msg = v.message;
            switch (msg.type) {
            case 1: // new room data //
                room.value.data = msg.data;
                break;
            case 2: // new field dice //
                room.value.data.fieldDice = msg.data;
                rollSound.load();
                rollSound.play();
                break;
            case 3: // new score //
                room.value.data.playerScore[msg.data.turn].value[msg.data.scoreKey] = msg.data.score;
                break;
            case 4: // new turn //
                room.value.data.turn = msg.data;
                break;
            case 5: // new round //
                room.value.data.round = msg.data;
                break;
            case 6: // new rerollCount //
                room.value.data.rerollCount = msg.data;
                break;
            case 7: // new timer //
                room.value.data.timer = msg.data;
                break;
            case 8: // game end //
                room.value.start = false;
                room.value.data.resultTable = msg.data.resultTable;
                break;
            }

            store.commit('popGameMessage');
        })

        return {
            room,
        };
    },
}
</script>

<style lang="scss" scoped>
.yahtzee {
    width: 100%;
}
</style>