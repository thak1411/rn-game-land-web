<template lang="pug">
table.yahtzee-table
    thead
        tr
            th
                rntxt(:init_message="t('game.yahtzee.score')" :init_fontSize="14" :init_fontWeight="900")
            th(v-for="(item, key) in player" :key="key")
                rntxt(:init_message="item.name" :init_fontSize="14" :init_fontWeight="900")
    tbody
        tr(v-for="(item, key) in scoreList" :key="key")
            td
                rntxt(:init_message="t(item.label1)" :init_fontSize="16" :init_fontWeight="900")
                br
                rntxt(:init_message="t(item.label2)")
            td(v-for="(pitem, pkey) in player" :key="pkey"
                @click="onClickScore(item.key, pitem.id)"
                :class="(scored(item.key, pkey) ? 'scored' : 'not-scored') + ' ' + (turn == pkey ? 'turn' : 'wait')"
            )
                rntxt(:init_message="getScore(item.key, pkey)" :init_fontSize="14")
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { ref, toRefs, computed } from 'vue';

import handler from './handler.js';
import Util from '../../../../components/js/util.js';
import rntxt from '../../../../components/rntxt.vue';
import wsHandler from '../../../../../js/websocket/handler.js';

export default {
    name: 'yahtzee-table',
    components: {
        rntxt,
    },
    props: {
        room: {
            default: {},
        },
    },
    setup: function(props, {emit}) {
        const room = Util.modelIO(props, emit, 'room');
        const store = useStore();
        const { t } = useI18n();
        const scoreList = ref(handler.scoreList);

        const player = computed(() => {
            return room.value.player ? room.value.player : [];
        })
        const dice = computed(() => {
            return room.value.data ? room.value.data.fieldDice : [];
        })
        const score = computed(() => {
            return room.value.data ? room.value.data.playerScore : [];
        })
        const turn = computed(() => {
            return room.value.data ? room.value.data.turn : -1;
        })


        const onClickScore = (key, pkey) => {
            if (pkey != store.state.user.id) return;
            wsHandler.sendGameMessage(pkey, room.value.id, 101, {scoreKey: key}) // Warnings: 101 Code Hard Coding Issue //
        }

        const calcScore = (key, pkey) => {
            if (key == 7 || key == 8 || pkey != turn.value) return '';
            return handler.calcScore(dice.value, key);
        }

        const getScore = computed(() => {
            return (key, pkey) => {
                return score.value[pkey] ? score.value[pkey].value[key] != undefined ? score.value[pkey].value[key] : calcScore(key, pkey) : -1;
            };
        })

        const scored = computed(() => {
            return (key, pkey) => {
                if (key == 7 || key == 8) return true;
                return score.value[pkey] ? score.value[pkey].value[key] != undefined : false;
            };
        })

        return {
            t,
            turn,
            dice,
            score,
            scored,
            player,
            getScore,
            scoreList,
            onClickScore,
        };
    },
}
</script>

<style lang="scss" scoped>
.yahtzee-table {
    width: 100%;
    border-collapse: collapse;

    td, th {
        height: 40px;
        padding: 8px 10px;
        box-sizing: border-box;
        border: 1px solid rgb(221, 221, 221);
    }
    th {
        text-align: left;
    }
    tbody tr:nth-child(2n - 1) {
        background-color: rgb(249, 249, 249);
    }
}
.turn:not(.scored) {
    cursor: pointer;
    background-color: #44ee44;
}
</style>