<template lang="pug">
div.gamelist-section
    div.gamelist-content
        div.gamelist-title
            rntxt(:init_message="t('gamelist.title')" :init_fontSize="30" :init_fontWeight="900")
        table.game-table
            thead
                tr
                    th
                        rntxt(init_message="#" :init_fontSize="16")
                    th
                        rntxt(:init_message="t('gamelist.name')" :init_fontSize="16")
                    th
                        rntxt(:init_message="t('gamelist.min-player')" :init_fontSize="16")
            tbody
                tr(v-for="(game, key) in gamelist" :key="key")
                    td
                        rntxt(:init_message="game.id" :init_fontSize="14")
                    td.item-name
                        rntxt(:init_message="game.name" :init_fontSize="14" @click="onClick(game.id, game.name)")
                    td
                        rntxt(:init_message="game.minPlayer" :init_fontSize="14")
                    
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import gameApi from '../../../js/api/game.js';
import rntxt from '../../components/rntxt.vue';

export default {
    name: 'gamelist-section',
    components: {
        rntxt,
    },
    setup: function() {
        const { t } = useI18n();
        const gamelist = ref([]);

        setTimeout(() => {
            gameApi.getGamelist()
            .then(res => {
                gamelist.value = res.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        }, 0);

        const onClick = (id, name) => {
            const cf = confirm('[' + name + ']: ' + t('gamelist.open'));
            if (cf) {
                gameApi.createRoom(id, "") // TODO: Add Default Option In Second //
                .then(res => {
                    window.location.href = '/';
                })
                .catch(err => {
                    console.log('err', err);
                });
            }
        }

        return {
            t,
            onClick,
            gamelist,
        };
    },
}
</script>

<style lang="scss" scoped>
.gamelist-section {
    width: 100%;
}
.gamelist-content {
    width: 100%;
    padding: 30px 25px;
    box-sizing: border-box;
}
.game-table {
    width: 100%;
    margin-top: 40px;
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
    tbody tr:nth-child(2n - 1) {
        background-color: rgb(249, 249, 249);
    }
}
.item-name {
    span {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>