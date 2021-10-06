<template lang="pug">
div#rn-app
    rn-root
</template>

<script>
import RnRoot from './Root.vue';
export default {
    name: 'rn-app',
    components: {
        RnRoot,
    },
}
</script>

<style lang="scss">
#rn-app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    position: absolute;
    overflow: auto hidden;
}
</style>