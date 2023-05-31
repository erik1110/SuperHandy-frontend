<template>
    <div class="sp-py-3 sp-flex sp-space-x-2">
        <!-- <v-img aspect-ratio="1" cover class="box sp-relative"
            src="https://storage.googleapis.com/superhandy.appspot.com/images/bc5b74fd-5564-4903-ad94-c5bcc712b7f6.jpg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756675200&Signature=KgO9RXgE1RpEggm%2FtH7gnWOS9ZnFqBAx553V0BWgAZ%2FXeFOzHXc0AvT2d5yxa%2Fv4q07xdCG9y0Ws65jdU4qIJdxKb29UX82OUe1XLO%2F86UAlWfpj6kRcl1GjuxAR0XqWKjdy862G61zXO7LYoC3rKz9aUYCBluAN5dTCdstRO6CtL0bjtssaKcDgBDMlKo2fQ%2FnxnE%2BbzoScJexEiuG3fjYBq6v5wRYvYwDTBTyK%2BJMWdLJjlyNnWdMIRd5N%2Fj4GZAfjP6Csmc3%2F1of1xhnhO3x8SP%2BBpsAyS8j9%2B06wGxJmswStuyq2pncNsWdY81ed%2F%2BL3j0XT5UiQxRZdWZY%2BzQ%3D%3D">
            <v-btn variant="plain" icon="mdi-close-circle" class="btn-del-img"></v-btn>
        </v-img> -->
        <div v-for="item, idx in imgUrls" :key="idx">
            <v-img :src="item" aspect-ratio="1" cover class="box" :data-id="idx">
                <v-btn :data-id="idx" variant="plain" icon="mdi-close-circle" :ripple="false" class="btn-del-img" @click="deleteConfirm(idx,$event)"></v-btn>
            </v-img>
        </div>

        <!-- 上傳照片按鈕 -->
        <label class="box btn-area sp-cursor-pointer" :class="imgUrls.length >= 5 ? 'd-none':''">
            <v-progress-circular v-if="circularLoading" indeterminate color="v-purple"></v-progress-circular>
            <div v-else class="sp-text-center sp-text-sm">
                <div class="mdi mdi-plus"></div>
                <div>上傳照片</div>
            </div>
            <input class="d-none" type="file" accept=".png, .jpg, .jpeg" @change="upload" />
        </label>
        <!-- 上傳照片按鈕 -->
    </div>
    <ul class="sp-text-sm sp-list-disc sp-pl-5">
        <li class="sp-text-gray-placeholder sp-text-sm">每筆任務最多可上傳5張照片，每張照片大小不超過2MB，只支援JPG、PNG格式。</li>
    </ul>

</template>

<script setup>
import { storeToRefs } from 'pinia'
import { siteConfig } from "@/services/siteConfig";
import { postTaskConfig } from "@/services/postTaskConfig";
import { storePostTask } from "@/stores/storePostTask";
import { postUploadImage } from '@/services/apis/general'
const _storePostTask = storePostTask();
const { openConfirmModal, openInfoModal, openErrorModal, openModal, closeModal} = storePostTask();
const { imgUrls } = storeToRefs(_storePostTask)
const { checkRespStatus, checkUploadImage } = useSpUtility()
const { logInfo, logError } = useLog()
const _work = '圖片上傳'
const circularLoading = ref(false)

const upload = async (event) => {
    console.log('anna')
    let _message = ''
    let _dialogType = postTaskConfig.dialogType.error
    const _file = event.target.files[0]
    circularLoading.value = true
    try {
        //檢查圖片大小不可超過2MB
        logInfo(_work, 'file.size', _file.size)
        if (!checkUploadImage(_file.size, siteConfig.Image.upload.maxSize)) {
            logError(_work, 'file.size', _file.size)
            openErrorModal(`圖片大小不可超過${siteConfig.Image.upload.maxSizeCn}`)
            circularLoading.value = false
            return;
        }

        let formData = new FormData();
        formData.append("file", _file)
        const response = await postUploadImage(formData)
        if (response && checkRespStatus(response)) {
            logInfo(_work, 'upload success')
            _dialogType = postTaskConfig.dialogType.info
            imgUrls.value.push(response.data.imgUrl)
        }
        _message = response.message

    } catch (error) {
        logError(_work, { error })
        _message = '圖片上傳失敗'
    } finally {
        _storePostTask.openModal({ type: _dialogType, message: _message })
        circularLoading.value = false
    }

}


const deleteConfirm = (idx,event) => {
    console.log(idx,'idx')

    const deleteImage = () => {
        imgUrls.value.splice(idx,1)
        closeModal()
    }
    openConfirmModal('是否要刪除這張照片?',deleteImage)
}
</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.box {
    width: 100px;
    height: 100px;
}

.box {
    @apply sp-border sp-border-dashed sp-rounded-lg sp-flex sp-justify-center sp-items-center sp-text-purple
}

.btn-del-img{
    position: absolute;
    top: -12px;
    right: -12px;
}
</style>

