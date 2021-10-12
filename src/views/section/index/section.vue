<template lang="pug">
div.index-section
    input#rn-ws(type="text")
    button(@click="onClick") SEND
</template>

<script>
import { onMounted, ref } from 'vue';
// import { connectTest } from '../../../js/websocket/test.js';

export default {
    name: 'index-section',
    setup: function(props) {
        let ws = {};
        onMounted(() => {
            // ws = connectTest()
        });
        const onClick = function() {
            const data = document.querySelector('#rn-ws').value
            console.log('send', data);
            ws.send(data);
            document.querySelector('#rn-ws').value = '';
        }

        return {
            ws,
            onClick,
        };
    }
}
</script>

<style lang="scss" scoped>
.index-section {
    width: 100%;
}
</style>