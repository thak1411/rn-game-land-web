<template lang="pug">
header.rn-header
    div.vt-wrapper
        div.vt-container(@click="onClickLogo")
            rntxt.ml20.cp(init_message="Rn Game Land" :init_fontSize="22" :init_fontWeight="900")
        div.vt-container
            navbtn.ml20(:init_message="t('header.gamelist')" init_href="gamelist")
            navbtn.ml20(:init_message="t('header.community')" init_href="community")
            navbtn.ml20(:init_message="t('header.rank')" init_href="rank")
    div.vt-wrapper.fr.prel
        div.vt-container.header-profile(@click="onClickProfileCard")
            rntxt.bgear(:init_message="userName" :init_fontSize="18" :init_fontWeight="600")
            div.caret
        div.profile-menu(v-if="isToggleMenu")
            div(v-if="userId == null")
                button.profile-menu-item(@click="onClickSignin")
                    rntxt(:init_message="t('header.signin')" :init_fontSize="18")
                button.profile-menu-item(@click="onClickSignup")
                    rntxt(:init_message="t('header.signup')" :init_fontSize="18")
            div(v-else)
                button.profile-menu-item(@click="onClickProfile")
                    rntxt(:init_message="t('header.profile')" :init_fontSize="18")
                button.profile-menu-item(@click="onClickSignout")
                    rntxt(:init_message="t('header.signout')" :init_fontSize="18")
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';

import navbtn from './navbtn.vue';
import userApi from '../../js/api/user.js';
import rntxt from '../components/rntxt.vue';

export default {
    name: 'rn-header',
    components: {
        rntxt,
        navbtn,
    },
    setup: function(props) {
        const store = useStore();
        const { t } = useI18n();
        const isToggleMenu = ref(false);

        const onClickLogo = () => {
            window.location.href = '/';
        }
        const onClickProfileCard = () => {
            isToggleMenu.value = !isToggleMenu.value;
        }
        const onClickSignin = () => {
            window.location.href = 'signin';
        }
        const onClickSignup = () => {
            window.location.href = 'signup';
        }
        const onClickSignout = () => {
            userApi.signout(store);
        }
        const onClickProfile = () => {
            window.location.href = 'profile';
        }

        const userId = computed(() => store.state.user.id);
        const userName = computed(() => store.state.user.name);

        return {
            t,
            userId,
            userName,
            onClickLogo,
            isToggleMenu,
            onClickSignin,
            onClickSignup,
            onClickSignout,
            onClickProfile,
            onClickProfileCard,
        };
    }
}
</script>

<style lang="scss" scoped>
.rn-header {
    width: 100%;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 6px 0px;
}
.vt-wrapper {
    display: inline-table;
    height: 100%;
}
.vt-container {
    display: table-cell;
    vertical-align: middle;
}
.ml20 {
    margin-left: 20px;
}
.cp {
    cursor: pointer
}
.fr {
    float: right;
}
.prel {
    position: relative;
}
.profile-menu {
    left: 0;
    top: calc(100% + 5px);
    width: 100%;
    position: absolute;
}
.profile-menu-item {
    width: 100%;
    height: 40px;
    border: none;
    cursor: pointer;
    padding: 0px 12px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0);
    &:hover {
        background-color: #ececec;
    }
}
.header-profile {
    cursor: pointer;
    padding: 0px 25px;
    box-sizing: border-box;
}
.caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 5px dashed;
    border-top: 5px solid;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
}
</style>