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
        room: {},
        chatList: [],
        joinAlert: [],
        leaveAlert: [],
        gameMessage: [],
        inviteAlert: [],
        inviteToast: [],
        rejectSelfAlert: [],
        rejectInviteAlert: [],
    },
    getters: {
        joinAlertFirst: (state) => state.joinAlert.length > 0 ? state.joinAlert[0] : null,
        leaveAlertFirst: (state) => state.leaveAlert.length > 0 ? state.leaveAlert[0] : null,
        inviteAlertFirst: (state) => state.inviteAlert.length > 0 ? state.inviteAlert[0] : null,
        rejectSelfAlertFirst: (state) => state.rejectSelfAlert.length > 0 ? state.rejectSelfAlert[0] : null,
        rejectInviteAlertFirst: (state) => state.rejectInviteAlert.length > 0 ? state.rejectInviteAlert[0] : null,
        gameMessageFirst: (state) => state.gameMessage.length > 0 ? state.gameMessage[0] : null,
        inviteToast: (state) => state.inviteToast,
        userName: (state) => state.user.name,
        chatList: (state) => state.chatList,
        room: (state) => state.room,
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
            state.inviteToast.splice(payload, 1);
        },
        appendRejectInviteAlert: function(state, payload) {
            state.rejectInviteAlert.push(payload);
        },
        popRejectInviteAlert: function(state) {
            state.rejectInviteAlert.shift();
        },
        appendRejectSelfAlert: function(state, payload) {
            state.rejectSelfAlert.push(payload);
        },
        popRejectSelfAlert: function(state) {
            state.rejectSelfAlert.shift();
        },
        appendGameMessage: function(state, payload) {
            state.gameMessage.push(payload);
        },
        popGameMessage: function(state) {
            state.gameMessage.shift();
        },
        appendChatMessage: function(state, payload) {
            if (state.chatList.length >= 100) state.chatList.shift();
            state.chatList.push(payload);
        },
        setNewRoom: function(state, payload) {
            state.room = payload;
        },
    },
    actions: {
        
    },
    modules: {
    },
});