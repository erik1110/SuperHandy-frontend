<template>
    <div class="sp-bg-white sp-rounded-2xl lg:sp-mr-6 lg:sp-w-[250px] pa-1">
        <div class="wrap sp-items-center sp-border-b sp-border-slate-300">
            <p class="sp-font-bold">案主資訊</p>
        </div>
        <div class="wrap">
            <p class="sp-w-[56px] title">
                姓名
            </p>
            <p v-if="posterInfoData.lastName">
                <FindTaskDetailImageTooltip :text="'點擊看案主資訊'" :location="'right'">
                    <a class="sp-text-purple hover:sp-cursor-pointer" @click="posterDialog = true">
                        {{ posterInfoData.lastName }}**
                    </a>
                </FindTaskDetailImageTooltip>
            </p>
        </div>
        <div class="wrap">
            <p class="sp-w-[56px] title">
                電話
            </p>
            <p>
                {{ posterInfoData.phone }}
            </p>
        </div>
        <div class="wrap">
            <p class="sp-min-w-[56px] title">
                Email
            </p>
            <p>
                {{ posterInfoData.email }}
            </p>
        </div>
    </div>
    <FindTaskDetailPosterModal :dialog="posterDialog" :data="posterInfoData" @close="posterDialog = false">
    </FindTaskDetailPosterModal>
</template>

<script setup>
const { posterInfoData } = defineProps(["posterInfoData"]);
const posterDialog = ref(false)
</script>

<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.wrap {
    @apply sp-flex sp-px-6 sp-py-2;
}

.title {
    @apply sp-text-gray-placeholder sp-font-bold
}
</style>
