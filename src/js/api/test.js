import axios from 'axios';

export default {
    loginTest: function() {
        axios.post('/api/user/user', {
            name: 'name',
            username: 'username',
            password: 'password',
        })
        .then(res => {
            console.log('res', res.data)
        })
        .then(() => {
            console.log('try login')
            axios.post('/api/user/login', {
                username: 'username',
                password: 'password'
            })
            .then(res => {
                console.log('login result', res)
                axios.get('/api/user/all-user')
                .then(res => {
                    console.log('get user', res.data)
                })
                .catch(err => {
                    console.log('err', err)
                })

                axios.post('/api/user/add-friend', {
                    username: 'username',
                    target: 'admin',
                })
                .then(res => {
                    console.log('add friend', res)
                })
                .catch(err => {
                    console.log('err', err)
                })
            })
            .catch(err => {
                console.log('err', err)
            })
        })
        .catch(err => {
            console.log('err', err)
        })
    },
}