import status from './statuscode';

// function sendPublicChat(msg) {
//     cws.send(wsData(status.BROADCAST_PUBLIC, msg));
// }
// function sendRoomInvite(roomId, targetId) {
//     if (noticeConnected == false) {
//         nwsQueue.push(wsData(status.NOTICE_INVITE, JSON.stringify({
//             roomId: parseInt(roomId),
//             targetId,
//         })));
//         return;
//     }
//     nws.send(wsData(status.NOTICE_INVITE, JSON.stringify({
//         roomId: parseInt(roomId),
//         targetId,
//     })));
// }
// function sendJoinRoom(roomId) {
//     if (noticeConnected == false) {
//         nwsQueue.push(wsData(status.NOTICE_JOIN, roomId));
//         return;
//     }
//     nws.send(wsData(status.NOTICE_JOIN, roomId));
// }

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

function sendPublicChat(msg) {
    const content = {
        data: msg,
    }
    if (connected == false) {
        msgQueue.push(wsData(status.BROADCAST_PUBLIC, content));
        return;
    }
    ws.send(wsData(status.BROADCAST_PUBLIC, content));
}

function sendRoomInvite(roomId, targetId) {
    const content = {
        roomId: parseInt(roomId),
        targetId,
    }
    if (connected == false) {
        msgQueue.push(wsData(status.NOTICE_INVITE, content));
        return;
    }
    ws.send(wsData(status.NOTICE_INVITE, content));
}
function sendJoinRoom(roomId) {
    const content = {
        roomId: parseInt(roomId),
    }
    console.log(wsData(status.NOTICE_JOIN, content))
    if (connected == false) {
        msgQueue.push(wsData(status.NOTICE_JOIN, content));
        return;
    }
    ws.send(wsData(status.NOTICE_JOIN, content));
}

export default {
    connectWs,
    sendJoinRoom,
    sendRoomInvite,
    sendPublicChat,

    // sendJoinRoom,
    // connectChatWs,
    // sendPublicChat,
    // sendRoomInvite,
    // connectNoticeWs,
}