import { useStore } from 'vuex';

import userApi from '../../js/api/user.js';
import wsHandler from '../../js/websocket/handler.js';

function fetch() {
    const store = useStore();

    setTimeout(() => {
        userApi.getProfile()
        .then(res => {
            store.commit('setUser', res.data);
            wsHandler.connectWs(res.data);
        })
        .catch(err => { // guest //
            const guest = {
                id: null,
                username: 'GUEST',
            }
            store.commit('setUser', guest);
            wsHandler.connectWs(guest);
        });
    });
}

export default {
    fetch,
}