<template lang="pug">
div.index-section
    input#rn-ws(type="text")
    button(@click="onClick") SEND
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
    name: 'index-section',
    setup: function(props) {
        let ws = {};
        onMounted(() => {
            // const scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
            // const uri = scheme + window.location.hostname + ':8192/ws/connect';

            // ws = new WebSocket(uri);
            // ws.onopen = function() {
            //     console.log('Connected');
            // };
            // ws.onclose = function() {
            //     console.log('Closed');
            // }
            // ws.onmessage = function(e) {
            //     console.log('RCV', e.data);
            //     console.log();
            //     console.log(e);
            // }
            // ws.onerror = function(e) {
            //     console.log('err', e)
            // }
            axios.post('/api/user/user', {
                username: 'rn',
                password: 'rnrn',
            })
            .then(res => {
                console.log('res', res.data)
            })
            .catch(err => {
                console.log('err', err)
            })
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