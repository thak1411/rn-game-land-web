<template lang="pug">
div#rn-app
    rn-root
</template>

<script>
import RnRoot from './Root.vue';
import mixin from '../mixin/mixin_default.js';

export default {
    name: 'rn-app',
    components: {
        RnRoot,
    },
    setup: function(props) {
        mixin.fetchData();
    }
}
</script>

<style lang="scss">
@import "../mixin/mixin_default.scss";
</style>