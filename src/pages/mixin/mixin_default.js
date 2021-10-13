import { useStore } from 'vuex';

export default {
    fetchData: function() {
        const store = useStore();
        
        store.dispatch('fetchUser');
    },
}