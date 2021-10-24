import status from './statuscode';

let ws = null;
let msgQueue = [];
let connected = false;

function wsData(code, message) {
    return JSON.stringify({
        code,
        message,
    });
}

function onConnect() {
    connected = true;
    console.log('connect ws server');
    for (let i = 0; i < msgQueue.length; ++i) {
        ws.send(msgQueue[i]);
    }
}

function onQuery(callback) {
    return (e) => {
        callback(JSON.parse(e.data));
        ws.send(wsData(status.PONG, ''));
    };
}

function onDisconnect() {
    console.log('disconnect ws server');
}

function onError(err) {
    console.log('ws server error', err);
}

function connectWs(callback) {
    const scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
    const uri = scheme + window.location.hostname + (window.location.port === ''? '' : ':' + window.location.port) + '/ws/connect';
    ws = new WebSocket(uri);

    ws.onopen = onConnect;
    ws.onmessage = onQuery(callback);
    ws.onclose = onDisconnect;
    ws.onerror = onError;
}

function sendDefaultMessage(msg) {
    if (connected == false) {
        msgQueue.push(msg);
        return;
    }
    ws.send(msg)
}

function sendPublicChat(msg) {
    const content = {
        data: msg,
    }
    sendDefaultMessage(wsData(status.BROADCAST_PUBLIC, content));
}
function sendRoomInvite(roomId, targetId) {
    const content = {
        roomId: parseInt(roomId),
        targetId,
    }
    sendDefaultMessage(wsData(status.NOTICE_INVITE, content));
}
function sendJoinRoom(roomId) {
    const content = {
        roomId: parseInt(roomId),
    }
    sendDefaultMessage(wsData(status.NOTICE_JOIN, content));
}
function sendRejectInvite(roomId) {
    const content = {
        roomId: parseInt(roomId)
    }
    sendDefaultMessage(wsData(status.NOTICE_REJECT_INVITE, content));
}

export default {
    connectWs,
    sendJoinRoom,
    sendRoomInvite,
    sendPublicChat,
    sendRejectInvite,
}