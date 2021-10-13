<template lang="pug">
div.rn-modal(v-if="open")
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

import rntxt from '../components/rntxt.vue';

export default {
    name: 'rn-modal',
    components: {
        rntxt,
    },
    setup: function() {
        const { t } = useI18n();
        const store = useStore();

        const open = computed(() => store.state.modal.open);

        return {
            t,
            open,
        };
    },
}
</script>

<style lang="scss" scoped>
.rn-modal {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>