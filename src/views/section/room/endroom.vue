<template lang="pug">
div.room-end
    div.room-title
        rntxt(:init_message="room.name" :init_fontSize="30")
    div.room-subtitle
        rntxt(:init_message="t('game.end.subtitle')" :init_fontSize="18")
        button.exit-room-end-btn(@click="onClickExit")
            rntxt(:init_message="t('game.end.exit') + ` (${exitCount}...)`" :init_fontSize="14")
    div.room-content
        table.game-result
            thead
                tr
                    th
                        rntxt(:init_message="t('game.end.rank')" :init_fontSize="16")
                    th
                        rntxt(:init_message="t('game.end.player')" :init_fontSize="16")
                    th
                        rntxt(:init_message="t('game.end.score')" :init_fontSize="16")
            tbody
                tr(v-for="(item, key) in resultTable")
                    td
                        rntxt(:init_message="item.rank" :init_fontSize="16")
                    td
                        rntxt(:init_message="item.name" :init_fontSize="16")
                    td
                        rntxt(:init_message="item.score" :init_fontSize="16")
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';

import Util from '../../components/js/util.js';
import rntxt from '../../components/rntxt.vue';

export default {
    name: 'game-end',
    components: {
        rntxt,
    },
    props: {
        room: {
            default: {},
        },
        isStarted: {
            default: false,
        },
    },
    setup: function(props, {emit}) {
        const { t } = useI18n();

        const COUNT = 30; // 30 seconds //

        const room = Util.modelIO(props, emit, 'room');
        const isStarted = Util.modelIO(props, emit, 'isStarted');
        const initTime = ref(new Date().getTime() + 1000 * COUNT);
        const exitCount = ref(COUNT);

        const resultTable = computed(() => {
            return room.value.data.resultTable ? room.value.data.resultTable : [];
        });

        setTimeout(() => {
            exitCount.value = Math.floor((initTime.value - new Date().getTime()) % (1000 * 60) / 1000);
        }, 100);
        const interval = setInterval(() => {
            exitCount.value = Math.floor((initTime.value - new Date().getTime()) % (1000 * 60) / 1000);
            if (exitCount.value <= 0) {
                isStarted.value = false;
                clearInterval(interval);
            }
        }, 1001);

        const onClickExit = () => {
            isStarted.value = false;
        }

        return {
            t,
            room,
            exitCount,
            isStarted,
            resultTable,
            onClickExit,
        };
    },
}
</script>

<style lang="scss" scoped>
.room-end {
    width: 100%;
    padding: 30px 25px;
    box-sizing: border-box;
}
.room-title {
    width: 100%;
}
.room-subtitle {
    width: 100%;
    margin: 15px 0;
}
.game-result {
    width: 100%;
    border-collapse: collapse;

    td, th {
        height: 40px;
        padding: 8px 10px;
        box-sizing: border-box;
        border: 1px solid rgb(221, 221, 221);
    }
    td:nth-child(1) {
        width: 80px;
    }
    td:nth-child(3) {
        width: 220px;
    }
    th {
        text-align: left;
    }
    th:nth-child(1), td:nth-child(1) {
        width: 60px;
    }
    tbody tr:nth-child(2n - 1) {
        background-color: rgb(249, 249, 249);
    }
}
.exit-room-end-btn {
    width: 150px;
    margin-left: 8px;
}
</style>