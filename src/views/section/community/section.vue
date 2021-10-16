<template lang="pug">
div.community-section
    div.community-content
        div.community-title
            rntxt(:init_message="t('community.title')" :init_fontSize="30" :init_fontWeight="900")
        table.community-list
            thead
                tr
                    th
                        rntxt(init_message="#" :init_fontSize="16")
                    th
                        rntxt(init_message="#" :init_fontSize="16")
            div.community-item(v-for="(item, key) in userList" :key="key")
                rntxt(:init_message="item")
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import userApi from '../../../js/api/user.js';
import rntxt from '../../components/rntxt.vue';

export default {
    name: 'community-section',
    components: {
        rntxt,
    },
    setup: function(props) {
        const { t } = useI18n();
        const userList = ref([]);

        setTimeout(() => {
            userApi.getAllUser()
            .then(res => {
                userList.value = res.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        }, 0);

        return {
            t,
            userList,
        };
    },
}
</script>

<style lang="scss" scoped>
.community-section {
    width: 100%;
}
.community-content {
    width: 100%;
    padding: 30px 25px;
    box-sizing: border-box;
}
.community-list {
    width: 100%;
    margin-top: 40px;
}
</style>