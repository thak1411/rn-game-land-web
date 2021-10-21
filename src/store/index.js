import axios from 'axios';
import { toRef, ref } from 'vue';
import { createStore } from 'vuex';

export default createStore({
    state: {
        user: {
            id: null,
            name: '',
            username: '',
        },
        modal: {
            open: false,
        },
        ws: null,
        wsJoinData: [],
        wsLeaveData: [],
        wsInviteData: [],
    },
    getters: {
        wsJoinFirst: (state) => state.wsJoinData.length > 0 ? state.wsJoinData[0] : null,
        wsLeaveFirst: (state) => state.wsLeaveData.length > 0 ? state.wsLeaveData[0] : null,
        wsInviteFirst: (state) => state.wsInviteData.length > 0 ? state.wsInviteData[0] : null,
        userName: (state) => state.user.name,
    },
    mutations: {
        setUser: function(state, payload) {
            const { id, name, username } = payload;
            state.user.id = id;
            state.user.name = name;
            state.user.username = username;
        },
        setWs: function(state, payload) {
            state.ws = payload;
        },
        setWsJoinData: function(state, payload) {
            if (payload == null) state.wsJoinData.shift();
            else state.wsJoinData.push(payload);
        },
        setWsLeaveData: function(state, payload) {
            if (payload == null) state.wsLeaveData.shift();
            else state.wsLeaveData.push(payload);
        },
        setWsInviteData: function(state, payload) {
            if (payload == null) state.wsInviteData.shift();
            else state.wsInviteData.push(payload);
        },
    },
    actions: {
        
    },
    modules: {
    },
});