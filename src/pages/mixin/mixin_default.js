import { useStore } from 'vuex';

import userApi from '../../js/api/user.js';
import wsHandler from '../../js/websocket/handler.js';

import axios from 'axios';

function afterFetch(user) {
    switch (window.location.pathname) {
    case '/':
        wsHandler.connectChatWs();
        break;
    }
}

function fetch() {
    const store = useStore();
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