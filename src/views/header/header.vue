<template lang="pug">
header.rn-header
    rntxt(init_message="Rn Game Land" :init_fontSize="22")
</template>

<script>
import rntxt from '../components/rntxt.vue';

export default {
    name: 'rn-header',
    components: {
        rntxt,
    }
}
</script>

<style lang="scss" scoped>
.rn-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 6px 0px;
}
</style>