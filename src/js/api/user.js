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
}