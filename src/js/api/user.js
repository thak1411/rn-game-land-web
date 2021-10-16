import axios from 'axios';

export default {
    signout: function() {
        return axios.post('/api/user/logout');
    },
    signin: function(username, password) {
        return axios.post('/api/user/login', {
            username,
            password,
        });
    },
    signup: function(name, username, password) {
        return axios.post('/api/user/user', {
            name,
            username,
            password,
        });
    },
    getUser: function(name) {
        return axios.get('/api/user/profile', {
            params: {
                name,
            },
        });
    },
    getProfile: function() {
        return axios.get('/api/user/profile');
    },
    getAllUser: function() {
        return axios.get('/api/user/all');
    },
}