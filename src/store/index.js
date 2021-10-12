import axios from 'axios';
import { toRef, ref } from 'vue';
import { createStore } from 'vuex';

export default createStore({
    state: {
        user: {
            id: null,
            name: '',
        },
    },
    mutations: {
        setUser: function(state, payload) {
            const { id, name } = payload;
            state.user.id = id;
            state.user.name = name;
        },
    },
    actions: {
        fetchUser: function(context) {
            setTimeout(() => {
                axios.get('/api/user/profile')
                .then(res => {
                    context.commit('setUser', res.data)
                })
                .catch(err => { // guest //
                    context.commit('setUser', {
                        id: null,
                        name: 'GUEST',
                    });
                });
            }, 0);
        }
    },
    modules: {
    },
});