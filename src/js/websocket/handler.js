import status from './statuscode';

let ws = null;
let user = null;

function wsData(code, message) {
    return JSON.stringify({
        code,
        message,
    });
}

function onChatConnect() {
    console.log('connect');
    const us = JSON.stringify({
        id: user.id,
        username: user.username,
    });
    ws.send(wsData(status.INIT_USER, us));
}
function onChatQuery(e) {
    const div = document.createElement('div');
    const context = document.querySelector('#context');
    const data = JSON.parse(e.data);
    
    switch (data.code) {
    case 200:
        const body = data.message;
        div.textContent = `${body.time}_[${body.username}]: ${body.message}`;
        context.appendChild(div);
        context.scrollTo(0, context.scrollHeight);
        break;
    default:
        alert('server error');
    }
    ws.send(wsData(status.PONG, ''));
}



function onError(err) {
    console.log('err', err);
}
function onDisconnect() {
    console.log('disconnect');
}

function sendPublicChat(msg) {
    ws.send(wsData(status.BROADCAST_PUBLIC, msg));
}

function connectChatWs(_user) {
    user = Object.assign(_user);
    const scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
    const uri = scheme + window.location.hostname + (window.location.port === ''? '' : ':' + window.location.port) + '/ws/chat/connect';
    ws = new WebSocket(uri);

    ws.onopen = onChatConnect;
    ws.onmessage = onChatQuery;
    ws.onclose = onDisconnect;
    ws.onerror = onError;
}

export default {
    connectChatWs,
    sendPublicChat,
}