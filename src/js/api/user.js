import axios from 'axios';

export default {
    signout: function(store) {
        setTimeout(() => {
            axios.post('/api/user/signout')
            .then(res => {
                store.commit('setUser', {
                    id: null,
                    name: 'GUESTs',
                });
            })
            .catch(err => {
                console.log('log out error', err);
            })
        }, 0);
    },
}