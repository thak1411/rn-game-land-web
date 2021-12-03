<template lang="pug">
div.yahtzee-field
    div.field-content
        div.dice-container(v-for="(item, key) in dice" :key="key")
            img.dice-img(:src="imageLoader(item)" :class="selected[key] ? 'selected' : 'not-selected'" @click="onClickToggle(key)")
    div.field-controller
        button.roll(@click="onClickRoll" :class="selCount < 1 ? 'disroll' : 'enroll'")
            rntxt(:init_message="t('game.yahtzee.roll') + `(${rerollCount}/2)`")
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { ref, watch, computed } from 'vue';

import rntxt from '../../../../components/rntxt.vue';
import wsHandler from '../../../../../js/websocket/handler.js';
import Util from '../../../../components/js/util.js';

export default {
    name: 'yahtzee-field',
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
        const selCount = ref(0);
        const selected = ref([false, false, false, false, false]);

        const imageLoader = (diceNum) => {
            return require(`./resource/dice${diceNum}.png`);
        }

        const dice = computed(() => {
            return room.value.data ? room.value.data.fieldDice : [];
        })

        const initSelected = () => {
            for (let i = selected.value.length; i--; ) {
                selected.value[i] = false;
            }
            selCount.value = 0;
        }

        const onClickToggle = (key) => {
            if (rerollCount.value >= 2) return;
            if (selected.value[key]) --selCount.value;
            else ++selCount.value;
            selected.value[key] = !selected.value[key];
        }

        const onClickRoll = () => {
            if (selCount.value < 1) return;
            const sel = [];
            for (let i = 0; i < 5; i++) {
                if (selected.value[i]) {
                    sel.push(i);
                }
            }
            initSelected();
            wsHandler.sendGameMessage(store.state.user.id, room.value.id, 100, {selected: sel}) // Warnings: 101 Code Hard Coding Issue //
        }


        const turn = computed(() => {
            return room.value.data ? room.value.data.turn : 0;
        })
        const round = computed(() => {
            return room.value.data ? room.value.data.round : 0;
        })
        watch(turn, (v) => {
            initSelected();
        })
        watch(round, (v) => {
            initSelected();
        })

        const rerollCount = computed(() => {
            return room.value.data ? room.value.data.rerollCount : 0;
        })

        return {
            t,
            dice,
            selCount,
            selected,
            rerollCount,
            imageLoader,
            onClickRoll,
            onClickToggle,
        }
    }
}
</script>

<style lang="scss" scoped>
.yahtzee-field {
    width: 100%;
    padding: 30px 15px;
    box-sizing: border-box;
}
.field-content {
    width: 272px;
    padding: 3px;
    margin-left: auto;
    margin-right: auto;
}
.dice-container {
    width: 40px;
    height: 40px;
    margin-left: 12px;
    display: inline-block;
}
.selected {
    border-radius: 8px;
    border: 2px solid #ff0000;
}
.not-selected {
    border-radius: 8px;
    border: 2px solid #00000000;
}
.dice-img {
    cursor: pointer;
}
.field-controller {
    text-align: center;
}
.disroll {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
}
.enroll {
    cursor: pointer;
}
.roll {
    height: 30px;
    background: none;
}
</style>