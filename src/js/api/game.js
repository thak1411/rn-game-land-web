import axios from 'axios';

export default {
    getGamelist: function() {
        return axios.get('/api/game/gamelist');
    },
}