import axios from 'axios';
import { toRef, ref } from 'vue';
import { createStore } from 'vuex';

export default createStore({
    state: {
        user: {
            id: null,
            username: '',
        },
    },
    mutations: {
        setUser: function(state, payload) {
            const { id, username } = payload;
            state.user.id = id;
            state.user.username = username;
        },
    },
    actions: {
        fetchUser: function(context) {
            setTimeout(() => {
                axios.get('/api/user/profile')
                .then(res => {
                    context.commit('setUser', res.data);
                })
                .catch(err => { // guest //
                    context.commit('setUser', {
                        id: null,
                        username: 'GUEST',
                    });
                });
            }, 0);
        },
    },
    modules: {
    },
});