<template lang="pug">
footer.rn-footer
    rntxt(init_message="Made By Rn")
    br
    br
    rntxt(init_message="Project is Open Source")
    br
    a(href="https://www.github.com/thak1411/rn-game-land-web" target="_blank")
        rntxt(init_message="Frontend Repository")
    br
    a(href="https://www.github.com/thak1411/rn-game-land-server" target="_blank")
        rntxt(init_message="Backend Repository")
</template>

<script>
import rntxt from '../components/rntxt.vue';

export default {
    name: "rn-footer",
    components: {
        rntxt,
    },
}
</script>

<style lang="scss" scoped>
.rn-footer {
    width: 100%;
    height: 300px;
    margin-top: 80px;
    padding: 25px 35px;
    box-sizing: border-box;
    background-color: #ececec;
}
a {
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
        text-decoration-color: #000000;
    }
}
</style>