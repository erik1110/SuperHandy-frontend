<template>
    <div class="sp-card-wrapper sp-bg-white sp-p-6 sp-relative">
        <div v-if="taskData.isUrgent" class="fireIcon sp-flex-center sp-flex-col sp-absolute sp-right-6">
            <FireIcon class="sp-icon-md sp-text-white" />
            <p class="sp-text-caption sp-text-white">急件</p>
        </div>
        <div class="sp-mb-4 md:sp-flex md:sp-space-x-6">
            <p class="title sp-mb-1">任務類型</p>
            <div class="sp-whitespace-pre-line sp-text-gray-placeholder">
                {{ taskData.category }}
            </div>
        </div>
        <div class="sp-mb-4 md:sp-flex md:sp-space-x-6">
            <p class="title sp-mb-1">任務薪水</p>
            <div class="sp-text-body-sm sp-whitespace-pre-line sp-text-gray-placeholder" v-if="taskData.salary">
                {{ taskData.salary }} 點 超人幣
            </div>
        </div>
        <div class="sp-mb-4 md:sp-flex md:sp-space-x-6">
            <p class="title sp-mb-1">任務地點</p>
            <div class="sp-text-body-sm sp-whitespace-pre-line sp-text-gray-placeholder">
                {{ taskData.address }}
            </div>
        </div>
        <div class="sp-mb-4 md:sp-flex md:sp-space-x-6">
            <p class="title sp-mb-1">任務說明</p>
            <div class="sp-text-body-sm sp-whitespace-pre-line sp-text-gray-placeholder">
                記者李秉豪／台北即時報導
                2023年5月23日 週二 下午3:38
                今（23）日台銀牌告利率顯示，日圓續貶再度刷新今年最低點，對新台幣匯率落在0.2248元，若以10萬台幣換日圓，可換到44萬4,839日圓，與今年最高點0.24相比，可多換出2萬8173日圓，依天巡網資料顯示，目前往福岡機票最低約新台幣5400元，匯差相當於一張機票。

                日圓對美元昨日收在138.6日圓，今日持續貶值，一度貶至138.87日圓，貶1.7角，回到去年12月價格水準，受到美元回升及貨幣寬鬆政策持續下，日圓持續貶值，富蘭克林證券投顧認為，日圓價位尚未落底，給出的預測區間落在135-140。
            </div>
        </div>
        <div class="sp-mb-6">
            <p class="title sp-mb-2">任務照片</p>
            <Swiper class="swiper" :spaceBetween="5" :slidesPerView="1" :loop="true" :modules="[SwiperNavigation]"
                :navigation="{ nextEl: '.slideNext-btn' }" :breakpoints="{
                    '110': {
                        slidesPerView: 1,
                        spaceBetween: 5
                    },
                    '220': {
                        slidesPerView: 1.25,
                        spaceBetween: 5
                    },
                    '275': {
                        slidesPerView: 1.75,
                        spaceBetween: 5
                    },
                    '330': {
                        slidesPerView: 2.25,
                        spaceBetween: 5
                    },
                    '385': {
                        slidesPerView: 2.75,
                        spaceBetween: 5
                    },
                    '440': {
                        slidesPerView: 3.25,
                        spaceBetween: 5
                    },
                    '495': {
                        slidesPerView: 3.75,
                        spaceBetween: 5
                    },
                    '550': {
                        slidesPerView: 4.25,
                        spaceBetween: 5
                    },
                    '640': {
                        slidesPerView: 5,
                        spaceBetween: 5
                    },
                }">
                <SwiperSlide v-for="(i, idx) in 5" :key="idx">
                    <div class="sp-me-2 sp-rounded-lg sp-overflow-hidden sp-w-[100px] sp-h-[100px]">
                        <v-img cover
                            src="https://images.unsplash.com/photo-1683656017639-bc622715c153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
                    </div>
                </SwiperSlide>
                <div class="text-center my-2 sm:sp-hidden">
                    <SwiperControls :btnSize="'xsmal'"></SwiperControls>
                </div>

            </Swiper>
        </div>
        <div class="lg:sp-flex lg:sp-items-center text-center">
            <p class="sp-ml-auto sp-mr-3 sp-text-caption sp-text-slate-500 sp-mb-3 lg:sp-mb-0">
                <span class="sp-pr-2 sp-mr-1 sp-border-r sp-border-slate-400">刊登時間{{ fromNow(taskData.publishedAt) }}</span>
                {{ taskData.viewerCount }}人詢問
            </p>
            <v-btn color="v-purple" class="px-4" @click="$emit('aApply')" :loading="loading">
                <v-icon class="mr-1">mdi-cursor-pointer</v-icon>我要接案
            </v-btn>
        </div>
    </div>
</template>

<script setup>
import { FireIcon } from "@heroicons/vue/24/solid";

const { taskData, loading } = defineProps(["taskData", 'loading']);
const { fromNow } = useMoment();
</script>

<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.fireIcon {
    @apply sp-bg-warning sp-rounded-md sp-w-10 sp-h-10;
}

.title {
    @apply sp-text-gray-placeholder sp-font-bold sp-whitespace-nowrap
}

.swiper {
    margin-left: 0;
    max-width: 640px;
    width: 100%;
    height: auto;
}
</style>
