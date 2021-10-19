import status from './statuscode';

let cws = null;
let chatConnected = false;
let chatQueue = [];
let nws = null;
let noticeConnected = false;
let nwsQueue = [];

function wsData(code, message) {
    return JSON.stringify({
        code,
        message,
    });
}

function onChatConnect() {
    chatConnected = true;
    console.log('connect chat server');
    for (let i = 0; i < chatQueue.length; ++i) {
        cws.send(chatQueue[i]);
    }
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
    cws.send(wsData(status.PONG, ''));
}

function onNoticeConnect() {
    noticeConnected = true;
    console.log('connect notice server');
    for (let i = 0; i < nwsQueue.length; ++i) {
        nws.send(nwsQueue[i]);
    }
}
function onNoticeQuery(callback) {
    return (e) => {
        const data = JSON.parse(e.data);
        callback(data);
        nws.send(wsData(status.PONG, ''));
    };
}


function onError(err) {
    console.log('err', err);
}
function onDisconnect() {
    console.log('disconnect');
}

function sendPublicChat(msg) {
    cws.send(wsData(status.BROADCAST_PUBLIC, msg));
}
function sendRoomInvite(roomId, targetId) {
    if (noticeConnected == false) {
        nwsQueue.push(wsData(status.NOTICE_INVITE, JSON.stringify({
            roomId: parseInt(roomId),
            targetId,
        })));
        return;
    }
    nws.send(wsData(status.NOTICE_INVITE, JSON.stringify({
        roomId: parseInt(roomId),
        targetId,
    })));
}
function sendJoinRoom(roomId) {
    if (noticeConnected == false) {
        nwsQueue.push(wsData(status.NOTICE_JOIN, roomId));
        return;
    }
    nws.send(wsData(status.NOTICE_JOIN, roomId));
}

function connectChatWs() {
    const scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
    const uri = scheme + window.location.hostname + (window.location.port === ''? '' : ':' + window.location.port) + '/ws/chat/connect';
    cws = new WebSocket(uri);

    cws.onopen = onChatConnect;
    cws.onmessage = onChatQuery;
    cws.onclose = onDisconnect;
    cws.onerror = onError;
}

function connectNoticeWs(callback) {
    const scheme = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
    const uri = scheme + window.location.hostname + (window.location.port === ''? '' : ':' + window.location.port) + '/ws/notice/connect';
    nws = new WebSocket(uri);

    nws.onopen = onNoticeConnect;
    nws.onmessage = onNoticeQuery(callback);
    nws.onclose = onDisconnect;
    nws.onerror = onError;
}

export default {
    sendJoinRoom,
    connectChatWs,
    sendPublicChat,
    sendRoomInvite,
    connectNoticeWs,
}