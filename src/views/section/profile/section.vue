<template lang="pug">
div.profile-section
    div.profile-content
        div.profile-card
            div.profile-name
                rntxt(:init_message="name" :init_fontSize="30")
                button.follow-btn(v-if="!self && isMyFriend" @click="onClickRemove")
                    rntxt(:init_message="t('community.unfollow')" :init_fontSize="18" :init_fontWeight="700")
                button.follow-btn(v-else-if="!self && !isMyFriend" @click="onClick")
                    rntxt(:init_message="t('community.follow')" :init_fontSize="18" :init_fontWeight="700")
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';

import userApi from '../../../js/api/user.js';
import rntxt from '../../components/rntxt.vue';

export default {
    name: 'profile-section',
    components: {
        rntxt,
    },
    setup: function(props) {
        const { t } = useI18n();
        const store = useStore();
        var params = new URLSearchParams(window.location.search);
        const name = ref(params.get('name'));
        const isMyFriend = ref(false);
        
        if (params.has('name')) {
            setTimeout(() => {
                userApi.getUser(name.value)
                .then(res => {
                    if (res.data.id == -1) {
                        window.location.href = '/';
                    }
                })
                .catch(err => {
                    alert(t('server_error'));
                    window.location.href = '/';
                });
                userApi.isMyFriend(name.value)
                .then(res => {
                    isMyFriend.value = res.data.res;
                })
                .catch(err => {
                    // alert(t('server_error'));
                    // window.location.href = '/';
                });
            }, 0);
        } else {
            window.location.href = '/';
        }

        const onClick = () => {
            userApi.addFriend(name.value)
            .then(res => {
                isMyFriend.value = true;
            })
            .catch(err => {
                console.log('err', err);
            });
        }

        const onClickRemove = () => {
            userApi.removeFriend(name.value)
            .then(res => {
                isMyFriend.value = false;
            })
            .catch(err => {
                console.log('err', err);
            })
        }

        const self = computed(() => store.state.user.name == name.value);

        return {
            t,
            name,
            self,
            onClick,
            isMyFriend,
            onClickRemove,
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
.follow-btn {
    border: 0;
    cursor: pointer;
    margin-left: 8px;
}
</style>