import status from './statuscode';

let ws = null;

function wsData(code, message) {
    return JSON.stringify({
        code,
        message,
    });
}

function onChatConnect() {
    console.log('connect chat server');
}
function onChatQuery(e) {
    const div = document.createElement('div');
    const context = document.querySelector('#context');
    const data = JSON.parse(e.data);
    
    switch (data.code) {
    case 200:
        const body = data.message;
        div.textContent = `${body.time}_[${body.name}]: ${body.message}`;
        context.appendChild(div);
        context.scrollTo(0, context.scrollHeight);
        break;
    default:
        alert('server error');
    }
    ws.send(wsData(status.PONG, ''));
}

function onNoticeConnect() {
    console.log('connect notice server');
}
function onNoticeQuery(e) {
    const data = JSON.parse(e.data);

    switch (data.code) {
    case 200:
        const body = data.message;
        console.log(body);
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
function sendRoomInvite(roomId, targetId) {
    ws.send(wsData(status.NOTICE_INVITE, JSON.stringify({
        roomId,
        targetId,
    })));
}

function connectChatWs() {
    const scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
    const uri = scheme + window.location.hostname + (window.location.port === ''? '' : ':' + window.location.port) + '/ws/chat/connect';
    ws = new WebSocket(uri);

    ws.onopen = onChatConnect;
    ws.onmessage = onChatQuery;
    ws.onclose = onDisconnect;
    ws.onerror = onError;
}

function connectNoticeWs() {
    const scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
    const uri = scheme + window.location.hostname + (window.location.port === ''? '' : ':' + window.location.port) + '/ws/notice/connect';
    ws = new WebSocket(uri);

    ws.onopen = onNoticeConnect;
    ws.onmessage = onNoticeQuery;
    ws.onclose = onDisconnect;
    ws.onerror = onError;
}

export default {
    connectChatWs,
    sendPublicChat,
    sendRoomInvite,
    connectNoticeWs,
}