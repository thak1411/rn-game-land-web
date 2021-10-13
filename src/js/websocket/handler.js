import status from './statuscode';

let ws = null;
let user = null;

function wsData(code, message) {
    return JSON.stringify({
        code,
        message,
    });
}

function onConnect() {
    console.log('connect');
    // const us = JSON.stringify({
    //     id: user.id,
    //     username: user.username,
    // });
    // ws.send(wsData(status.INIT_USER, us));
}
function onDisconnect() {
    console.log('disconnect');
}
function onQuery(e) {
    switch (window.location.pathname) {
    case '/':
        var div = document.createElement('div');
        var context = document.querySelector('#context');
        div.textContent = e.data;
        context.appendChild(div);
        context.scrollTo(0, context.scrollHeight);
        break;
    }
    ws.send(wsData(status.PONG, ''));
}
function onError(err) {
    console.log('err', err);
}

function sendPublicChat(msg) {
    ws.send(wsData(status.BROADCAST_PUBLIC, msg));
}

function connectWs(_user) {
    user = Object.assign(_user);
    const scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
    const uri = scheme + window.location.hostname + (window.location.port === ''? '' : ':' + window.location.port) + '/ws/chat/connect';
    ws = new WebSocket(uri);

    ws.onopen = onConnect;
    ws.onclose = onDisconnect;
    ws.onmessage = onQuery;
    ws.onerror = onError;
    return ws;
}

export default {
    connectWs,
    sendPublicChat,
}