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
            td(v-for="(item, key) in player" :key="key")
                rntxt(:init_message="item" :init_fontSize="14")
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import handler from './handler.js';
import rntxt from '../../../../components/rntxt.vue';

export default {
    name: 'yahtzee-table',
    components: {
        rntxt,
    },
    props: {
        player: {
            default: [],
        },
    },
    setup: function(props) {
        const { t } = useI18n();
        const scoreList = ref(handler.scoreList);

        return {
            t,
            scoreList,
        };
    },
}
</script>

<style lang="scss" scoped>
.yahtzee-table {
    width: 100%;
    float: left;
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
</style>