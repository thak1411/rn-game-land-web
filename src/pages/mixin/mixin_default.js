import { useStore } from 'vuex';

import userApi from '../../js/api/user.js';
import wsHandler from '../../js/websocket/handler.js';

import axios from 'axios';

let store = null

function eventHandler(data) {
    switch (data.code) {
    case 200: // invite msg //
        
        break;
    case 201: // join alert //
        store.commit('setWsJoinData', data);
        break;
    case 202: // leave alert //
        store.commit('setWsLeaveData', data);
        break;
    default:
    }
}

function afterFetch(user) {
    wsHandler.connectNoticeWs(eventHandler);
    switch (window.location.pathname) {
    case '/':
        wsHandler.connectChatWs();
        break;
    }
}

function fetch() {
    store = useStore();
    axios.defaults.withCredentials = true;

    setTimeout(() => {
        userApi.getProfile()
        .then(res => {
            store.commit('setUser', res.data);
            afterFetch(res.data);
        })
        .catch(err => { // guest //
            const guest = {
                id: null,
                name: 'GUEST',
                username: '',
            };
            store.commit('setUser', guest);
            afterFetch(guest);
        });
    }, 0);
}

export default {
    fetch,
}