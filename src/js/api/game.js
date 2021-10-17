import axios from 'axios';

export default {
    getGamelist: function() {
        return axios.get('/api/game/gamelist');
    },
    createRoom: function(gameId, option) {
        return axios.post('/api/game/create-room', {
            gameId,
            option
        });
    },
}