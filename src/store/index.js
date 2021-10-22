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
        chatList: [],
        ws: null,
        wsRequest: [],
        wsJoinData: [],
        wsLeaveData: [],
        wsInviteData: [],
    },
    getters: {
        wsJoinFirst: (state) => state.wsJoinData.length > 0 ? state.wsJoinData[0] : null,
        wsLeaveFirst: (state) => state.wsLeaveData.length > 0 ? state.wsLeaveData[0] : null,
        wsInviteFirst: (state) => state.wsInviteData.length > 0 ? state.wsInviteData[0] : null,
        wsRequest: (state) => state.wsRequest,
        userName: (state) => state.user.name,
        chatList: (state) => state.chatList,
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
        setWsRequest: function(state, payload) {
            state.wsRequest.push(payload);
        },
        delWsRequest: function(state, payload) {
            state.wsRequest.splice(payload, 1);
        },
        appendChatMessage: function(state, payload) {
            if (state.chatList.length >= 50) state.chatList.shift()
            state.chatList.push(payload);
        },
    },
    actions: {
        
    },
    modules: {
    },
});