import { useStore } from 'vuex';

import userApi from '../../js/api/user.js';
import wsHandler from '../../js/websocket/handler.js';

import axios from 'axios';

let store = null

function eventHandler(data) {
    console.log('get', data)
    switch (data.code) {
    case 100: // broadcast //
        store.commit('appendChatMessage', data.message);
        break;
    case 200: // invite toast //
        store.commit('appendInviteToast', data);
        break;
    case 201: // join alert //
        store.commit('appendJoinAlert', data);
        break;
    case 202: // leave alert //
        store.commit('appendLeaveAlert', data);
        break;
    case 203: // invite alert //
        store.commit('appendInviteAlert', data);
        break;
    case 204: // reject invite //
        store.commit('appendRejectInviteAlert', data);
    default:
    }
}

function afterFetch(user) {
    wsHandler.connectWs(eventHandler);
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