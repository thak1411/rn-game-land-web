<template lang="pug">
extends ../template/sign.pug
block title
    rntxt(:init_message="t('sign.signup')" :init_fontSize="30" :init_fontWeight="900")
block subtitle
    rntxt(:init_message="t('sign.signup')" :init_fontSize="24" :init_fontWeight="700")
block content
    rninput(v-model="name" :init_placeHolder="t('sign.name')" :init_width="'100%'" :init_height="30" :init_fontSize="16" :init_maxLength="16" @keypress.enter="onSubmit")
    rninput.mt15(v-model="username" :init_placeHolder="t('sign.username')" :init_width="'100%'" :init_height="30" :init_fontSize="16" :init_maxLength="16" @keypress.enter="onSubmit")
    rninput.mt15(v-model="password" :init_placeHolder="t('sign.password')" :init_width="'100%'" :init_height="30" :init_fontSize="16" :init_maxLength="16" init_type="password" @keypress.enter="onSubmit")
    rninput.mt15(v-model="confirmPassword" :init_placeHolder="t('sign.confirm_password')" :init_width="'100%'" :init_height="30" :init_fontSize="16" :init_maxLength="16" init_type="password" @keypress.enter="onSubmit")
    rntxt(v-if="signFail" :init_message="failMessage" init_color="#ED2939")
    button.signup-btn.mt15(@click="onSubmit")
        rntxt(:init_message="t('submit')" :init_color="'#ffffff'")
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import userApi from '../../../js/api/user.js';
import rntxt from '../../components/rntxt.vue';
import rninput from '../../components/rninput.vue';

export default {
    name: 'signup-section',
    components: {
        rntxt,
        rninput,
    },
    setup: function(props) {
        const { t } = useI18n();
        const name = ref('');
        const username = ref('');
        const password = ref('');
        const signFail = ref(false);
        const failMessage = ref('');
        const confirmPassword = ref('');

        const onSubmit = () => {
            const reg = [/^[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|a-z|A-Z|0-9|]{2,6}$/, /^[a-z|A-Z|0-9|]{6,12}$/, /^[a-z|A-Z|0-9|]{6,12}$/];
            const msg = [t('sign.name_fail'), t('sign.username_fail'), t('sign.password_fail')];
            const tar = [name.value, username.value, password.value];
            for (let i = 0; i < reg.length; ++i) {
                const r = reg[i];
                const m = msg[i];
                const g = tar[i];
                if (!r.test(g)) {
                    signFail.value = true;
                    failMessage.value = m;
                    return;
                }
            }
            if (password.value !== confirmPassword.value) {
                signFail.value = true;
                failMessage.value = t('sign.confirm_password_fail');
                return;
            }
            setTimeout(() => {
                userApi.signup(name.value, username.value, password.value)
                .then(res => {
                    if (res.data.status == 910) {
                        alert(t('sign.signup_success'));
                        window.location.href = '/';
                    } else if (res.data.status == 909) {
                        signFail.value = true;
                        failMessage.value = t('sign.duplicated_username');
                    } else {
                        signFail.value = true;
                        failMessage.value = t('sign.duplicated_name');
                    }
                })
                .catch(err => {
                    alert(t('server_error'));
                });
            }, 0);
        }

        return {
            t,
            name,
            username,
            password,
            signFail,
            onSubmit,
            failMessage,
            confirmPassword,
        };
    },
}
</script>

<style lang="scss" scoped>
@import "../template/sign.scss";

.mt15 {
    margin-top: 15px;
}
.signup-btn {
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