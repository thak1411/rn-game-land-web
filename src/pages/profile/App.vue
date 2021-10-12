<template lang="pug">
div#rn-app
    rn-root
</template>

<script>
import RnRoot from './Root.vue';
import mixin from '../mixin/mixin_defualt.js';

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
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
#rn-app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    min-width: 780px;
    user-select: none;
    position: absolute;
    overflow: auto hidden;
}
</style>