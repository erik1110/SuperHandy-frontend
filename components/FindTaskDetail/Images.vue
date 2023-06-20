<template>
    <div class="sp-py-3 sp-flex sm:sp-space-x-2 sp-flex-wrap">
        <div v-for="item, idx in imgUrls" :key="idx" class="sp-relative pa-3">
            <FindTaskDetailImageTooltip :text="'點擊看大圖'">
                <v-img :src="item" aspect-ratio="1" cover class="box sp-cursor-pointer" :data-id="idx"
                    @click="openBigImg(item)">
                </v-img>
            </FindTaskDetailImageTooltip>
        </div>

        <!-- 顯示大圖 -->
        <v-overlay v-model="bigImgOverlay" @click="bigImgOverlay = false">
            <div class="sp-flex sp-w-[100vw] sp-h-[100vh] sp-items-center sp-justify-center">
                <v-img aspect-ratio="1" class="bigbox" :src="bigImgSrc" />
            </div>
        </v-overlay>
        <!-- 顯示大圖 -->
    </div>
</template>

<script setup>
const { imgUrls } = defineProps(["imgUrls"]);
const circularLoading = ref(false)
const bigImgOverlay = ref(false)
const bigImgSrc = ref('')

const openBigImg = (url) => {
    bigImgSrc.value = url
    bigImgOverlay.value = true
}

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
</style>

