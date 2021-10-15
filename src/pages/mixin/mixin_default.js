import { useStore } from 'vuex';

import userApi from '../../js/api/user.js';
import wsHandler from '../../js/websocket/handler.js';

import axios from 'axios';

function fetch() {
    const store = useStore();
    axios.defaults.withCredentials = true;

    setTimeout(() => {
        userApi.getProfile()
        .then(res => {
            store.commit('setUser', res.data);
            wsHandler.connectChatWs(res.data);
        })
        .catch(err => { // guest //
            const guest = {
                id: null,
                username: 'GUEST',
            }
            store.commit('setUser', guest);
            wsHandler.connectChatWs(guest);
        });
    });
}

export default {
    fetch,
}