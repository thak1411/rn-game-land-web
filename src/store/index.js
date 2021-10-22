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
        joinAlert: [],
        leaveAlert: [],
        inviteAlert: [],
        inviteToast: [],
    },
    getters: {
        joinAlertFirst: (state) => state.joinAlert.length > 0 ? state.joinAlert[0] : null,
        leaveAlertFirst: (state) => state.leaveAlert.length > 0 ? state.leaveAlert[0] : null,
        inviteAlertFirst: (state) => state.inviteAlert.length > 0 ? state.inviteAlert[0] : null,
        inviteToast: (state) => state.inviteToast,
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
        appendJoinAlert: function(state, payload) {
            state.joinAlert.push(payload);
        },
        popJoinAlert: function(state) {
            state.joinAlert.shift();
        },
        appendLeaveAlert: function(state, payload) {
            state.leaveAlert.push(payload);
        },
        popLeaveAlert: function(state) {
            state.leaveAlert.shift();
        },
        appendInviteAlert: function(state, payload) {
            state.inviteAlert.push(payload);
        },
        popInviteAlert: function(state) {
            state.inviteAlert.shift();
        },
        appendInviteToast: function(state, payload) {
            state.inviteToast.push(payload);
        },
        deleteInviteToast: function(state, payload) {
            state.wsRequest.splice(payload, 1);
        },
        appendChatMessage: function(state, payload) {
            if (state.chatList.length >= 100) state.chatList.shift()
            state.chatList.push(payload);
        },
    },
    actions: {
        
    },
    modules: {
    },
});