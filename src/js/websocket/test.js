export default {
    connectTest: function() {
        const scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
        const uri = scheme + window.location.hostname + ':8192/ws/connect';

        ws = new WebSocket(uri);
        ws.onopen = function() {
            console.log('Connected');
        };
        ws.onclose = function() {
            console.log('Closed');
        }
        ws.onmessage = function(e) {
            console.log('RCV', e.data);
            console.log();
            console.log(e);
        }
        ws.onerror = function(e) {
            console.log('err', e)
        }
        return ws;
    }
}