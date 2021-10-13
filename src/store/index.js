import axios from 'axios';
import { toRef, ref } from 'vue';
import { createStore } from 'vuex';

export default createStore({
    state: {
        user: {
            id: null,
            username: '',
        },
        modal: {
            open: false,
        },
        ws: null,
    },
    mutations: {
        setUser: function(state, payload) {
            const { id, username } = payload;
            state.user.id = id;
            state.user.username = username;
        },
        setWs: function(state, payload) {
            state.ws = payload;
        },
    },
    actions: {
        
    },
    modules: {
    },
});