<template>
    <div class="sp-py-3 sp-flex sm:sp-space-x-2 sp-flex-wrap">
        <!-- 照片列表 -->
        <div v-for="item, idx in imgUrls" :key="idx" class="sp-relative pa-3">
            <FindTaskDetailImageTooltip :text="'點擊看大圖'">
                <v-btn :data-id="idx" variant="plain" icon="mdi-close-circle" :ripple="false" class="btn-del-img"
                    @click="deleteConfirm(idx, $event)"></v-btn>
                <v-img :src="item" aspect-ratio="1" cover class="box sp-cursor-pointer" :data-id="idx"
                    @click="openBigImg(item)"></v-img>
            </FindTaskDetailImageTooltip>
        </div>
        <!-- 照片列表 -->

        <!-- 上傳照片按鈕 -->
        <div class="pa-3">
            <label class="box btn-area sp-cursor-pointer" :class="imgUrls.length >= 5 ? 'd-none' : ''">
                <v-progress-circular v-if="circularLoading" indeterminate color="v-purple"></v-progress-circular>
                <div v-else class="sp-text-center sp-text-sm">
                    <div class="mdi mdi-plus"></div>
                    <div>上傳照片</div>
                </div>
                <input class="d-none" type="file" accept=".png, .jpg, .jpeg" @change="upload" />
            </label>
        </div>
        <!-- 上傳照片按鈕 -->

        <!-- 顯示大圖 -->
        <v-overlay v-model="bigImgOverlay" @click="bigImgOverlay = false">
            <div class="sp-flex sp-w-[100vw] sp-h-[100vh] sp-items-center sp-justify-center">
                <v-img aspect-ratio="1" class="bigbox" :src="bigImgSrc" />
            </div>
        </v-overlay>
        <!-- 顯示大圖 -->
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

const { checkRespStatus, checkUploadImage } = useSpUtility()
const { logDebug, logError } = useLog()

const _storePostTask = storePostTask();
const { openConfirmModal, openErrorModal, closeModal } = storePostTask();
const { imgUrls } = storeToRefs(_storePostTask)

const _work = '圖片上傳'
const circularLoading = ref(false)
const bigImgOverlay = ref(false)
const bigImgSrc = ref('')

// - 上傳一張圖片 -
const upload = async (event) => {

    const _file = event.target.files[0]
    circularLoading.value = true
    try {
        //檢查圖片大小不可超過2MB
        logDebug(_work, 'file.size', _file.size)
        if (!checkUploadImage(_file.size, siteConfig.image.upload.maxSize)) {
            logError(_work, 'file.size', _file.size)
            openErrorModal(`圖片大小不可超過${siteConfig.image.upload.maxSizeCn}`)
            circularLoading.value = false
            return;
        }

        let formData = new FormData();
        formData.append("file", _file)
        const response = await postUploadImage(formData)
        if (response && !checkRespStatus(response)) {
            logError(_work, { response })
            openErrorModal(response.message)
        }

        logDebug(_work, 'upload success')
        imgUrls.value.push(response.data.imgUrl)
        //防止不能上傳同一張圖片
        event.target.value = ''

    } catch (error) {
        logError(_work, { error })
        openErrorModal('圖片上傳失敗')
    } finally {
        circularLoading.value = false
    }

}

// - 打開一張大圖 -
const openBigImg = (url) => {
    bigImgSrc.value = url
    bigImgOverlay.value = true
}

// - 刪除一張圖片 -
const deleteConfirm = (idx, event) => {

    // - 刪除一張圖片 -
    const deleteImage = () => {
        imgUrls.value.splice(idx, 1)
        closeModal()
    }
    openConfirmModal('是否要刪除這張照片?', deleteImage)
}

// - 重置 -
watch(bigImgOverlay, (nV, oV) => {
    if (!nV) {
        bigImgSrc.value = ''
    }
})

</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.box {
    width: 100px;
    height: 100px;
}

.bigbox {
    width: 50vw;
    height: 50vh;
}

.box {
    @apply sp-border sp-border-dashed sp-border-gray-placeholder sp-rounded-lg sp-flex sp-justify-center sp-items-center sp-text-purple
}

.btn-del-img {
    position: absolute;
    top: -12px;
    right: -12px;
    z-index: 99;
}
</style>

