<template lang="pug">
extends ../template/sign.pug
block title
    rntxt(:init_message="t('sign.signin')" :init_fontSize="30" :init_fontWeight="900")
block subtitle
    rntxt(:init_message="t('sign.signin')" :init_fontSize="24" :init_fontWeight="700")
block content
    //- rninput(v-model="ivalue")
    //- rninput(v-model:modelValue="ivalue")
    rninput(v-model="username" :init_placeHolder="t('sign.username')" :init_width="'100%'" :init_height="30" :init_fontSize="16" :init_maxLength="16" @keypress.enter="onSubmit")
    rninput.mt15(v-model="password" :init_placeHolder="t('sign.password')" :init_width="'100%'" :init_height="30" :init_fontSize="16" :init_maxLength="16" init_type="password" @keypress.enter="onSubmit")
    rntxt(v-if="signFail" :init_message="t('sign.signin_error')" init_color="#ED2939")
    button.signin-btn.mt15(@click="onSubmit")
        rntxt(:init_message="t('submit')" :init_color="'#ffffff'")
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import userApi from '../../../js/api/user.js';
import rntxt from '../../components/rntxt.vue';
import rninput from '../../components/rninput.vue';

export default {
    name: 'signin-section',
    components: {
        rntxt,
        rninput,
    },
    setup: function(props) {
        const { t } = useI18n();
        const username = ref('');
        const password = ref('');
        const signFail = ref(false);

        const onSubmit = () => {
            setTimeout(() => {
                userApi.signin(username.value, password.value)
                .then(res => {
                    if (window.history.state.position > 1) {
                        window.history.back()
                    } else {
                        window.location.href = '/';
                    }
                })
                .catch(err => {
                    if (err.request.status == 401) {
                        signFail.value = true;
                    } else {
                        alert(t('server_error'));
                    }
                })
            }, 0);
        }
        return {
            t,
            signFail,
            onSubmit,
            username,
            password,
        };
    },
}
</script>

<style lang="scss" scoped>
@import "../template/sign.scss";

.mt15 {
    margin-top: 15px;
}
.signin-btn {
    width: 100%;
    height: 30px;
    border: none;
    cursor: pointer;
    transition: all 0.25s;
    background-color: #00000090;
    &:hover {
        background-color: #000000;
    }
}
</style>