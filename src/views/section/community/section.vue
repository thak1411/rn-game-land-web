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
                        rntxt(:init_message="t('community.name')" :init_fontSize="16")
            tbody
                tr(v-for="(item, key) in userList" :key="key")
                    td.item-id
                        rntxt(:init_message="item.id" :init_fontSize="14")
                    td.item-name
                        rntxt(:init_message="item.name" :init_fontSize="14" @click="onClick(item.name)")
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
                res.data.sort((i, j) => i.id - j.id);
                userList.value = res.data;
            })
            .catch(err => {
                console.log('err', err);
            });
        }, 0);

        const onClick = (name) => {
            window.location.href = '/profile?name=' + name;
        }

        return {
            t,
            onClick,
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
    border-collapse: collapse;

    td, th {
        height: 40px;
        padding: 8px 10px;
        box-sizing: border-box;
        border: 1px solid rgb(221, 221, 221);
    }
    th {
        text-align: left;
    }
    tbody tr:nth-child(2n - 1) {
        background-color: rgb(249, 249, 249);
    }
}
.item-id {
    width: 80px;
}
.item-name {
    span {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>