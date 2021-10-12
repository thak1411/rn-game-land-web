<template lang="pug">
div.profile-section
    div.profile-content
        div.profile-card
            div.profile-name
                rntxt(:init_message="username" :init_fontSize="30")
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import userApi from '../../../js/api/user.js';
import rntxt from '../../components/rntxt.vue';

export default {
    name: 'profile-section',
    components: {
        rntxt,
    },
    setup: function(props) {
        const { t } = useI18n();
        var params = new URLSearchParams(window.location.search);
        const username = ref(params.get('username'));
        
        if (params.has('username')) {
            setTimeout(() => {
                userApi.getUser(username.value)
                .then(res => {
                    if (res.data.id == -1) {
                        window.location.href = '/';
                    }
                })
                .catch(() => {
                    alert(t('serve_error'));
                    window.location.href = '/';
                });
            });
        } else {
            window.location.href = '/';
        }
        return {
            t,
            username,
        };
    },
}
</script>

<style lang="scss" scoped>
.profile-section {
    width: 100%;
}
.profile-content {
    width: 100%;
}
.profile-card {
    width: 700px;
    margin-left: auto;
    margin-right: auto;
}
.profile-name {
    margin-top: 30px;
}
</style>