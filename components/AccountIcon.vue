<template>
    <v-icon v-if="isShowDefaultIcon">mdi-account-circle</v-icon>
    <div v-else class="size sp-bg-primary">
        <span class="sp-text-white">{{ lastName }}</span>
    </div>
</template>
<script setup>
import { getAccountProfile } from '@/services/apis/account.js'
const { checkIsLogin, promiseAllSettledHanlder, excuteAsyncFunc } = useSpUtility();
const { logError, logDebug } = useLog()
const lastName = ref('')
const _work = "會員Icon"
const isShowDefaultIcon = ref(true)
onMounted(() => {
    if (checkIsLogin) {
        isShowDefaultIcon.value = false;
        getLastName();
    }
})

const getLastName = () => {
    promiseAllSettledHanlder(
        [
            excuteAsyncFunc(_work, getAccountProfile, null, (response) => {
                let _lastName = response.data?.lastName ?? '';
                if (_lastName.length > 1) {
                    _lastName = _lastName.substr(1)
                }
                logDebug(_work, '_lastName', _lastName)
                lastName.value = _lastName
            })
        ]
        //成功
        , null
        //失敗
        , (error) => {
            isShowDefaultIcon.value = true;
            logError(_work, { error })
        }
        //finally
        , null
    )

}
</script>
<style scoped>
.size {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    line-height: 32px;
}
</style>