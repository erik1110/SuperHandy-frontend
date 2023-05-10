<template>
    <div class="d-flex justify-start" v-if="pointBarSwiperShow">
        <Swiper class="pointBarSwiper" :modules="[SwiperFreeMode, SwiperPagination]" :freeMode="true" :breakpoints="{
            '130': {
                slidesPerView: 0.5,
                spaceBetween: 10,
            },
            '260': {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            '335': {
                slidesPerView: 1.25,
                spaceBetween: 10,
            },
            '400': {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            '530': {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            '670': {
                slidesPerView: 2.5,
                spaceBetween: 10,
            },
            '810': {
                slidesPerView: 3,
                spaceBetween: 10,
            },
        }">
            <SwiperSlide>
                <div class="box bg-amber d-flex align-center justify-center">
                    <div class="text-center">
                        <div class="d-flex align-center justify-center">
                            <span class="sp-text-2xl sp-font-medium pr-1">{{ status.superCoin }}</span>
                            <v-icon icon="mdi-star-circle" size="x-small"></v-icon>
                        </div>
                        <p class="sp-text-sm">超人幣</p>
                    </div>
                </div>
                <div class="box bg-amber d-flex align-center justify-center">
                    <div class="text-center">
                        <div class="d-flex align-center justify-center">
                            <span class="sp-text-2xl sp-font-medium pr-1">{{ status.helperCoin }}</span>
                            <v-icon icon="mdi-star-circle" size="x-small"></v-icon>
                        </div>
                        <p class="sp-text-sm">幫手幣</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="box bg-amber d-flex align-center justify-center">
                    <div class="text-center">
                        <div class="d-flex align-center justify-center">
                            <span class="sp-text-2xl sp-font-medium pr-1">{{ status.numOfPostTasks }}</span>
                        </div>
                        <p class="sp-text-sm">發案數</p>
                    </div>
                </div>
                <div class="box bg-amber d-flex align-center justify-center">
                    <div class="text-center">
                        <div class="d-flex align-center justify-center">
                            <span class="sp-text-2xl sp-font-medium pr-1">{{ status.numOfCompletedTasks }}</span>
                        </div>
                        <p class="sp-text-sm">已接任務</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="box bg-amber d-flex align-center justify-center">
                    <div class="text-center">
                        <div class="d-flex align-center justify-center">
                            <span class="sp-text-2xl sp-font-medium pr-1">{{ status.ratingPoster }}</span>
                            <v-icon icon="mdi-star" size="x-small"></v-icon>
                        </div>
                        <p class="sp-text-sm">案主評價</p>
                    </div>
                </div>
                <div class="box bg-amber d-flex align-center justify-center">
                    <div class="text-center">
                        <div class="d-flex align-center justify-center">
                            <span class="sp-text-2xl sp-font-medium pr-1">{{ status.ratingHelper }}</span>
                            <v-icon icon="mdi-star" size="x-small"></v-icon>
                        </div>
                        <p class="sp-text-sm">幫手評價</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>
<script setup>
import { getProfileStatus } from '@/services/apis/account';
const { checkRespStatus } = useHttp();
const { logInfo, logError } = useLog();
const status = ref({
    superCoin: 0,
    helperCoin: 0,
    numOfPostTasks: 0,
    numOfCompletedTasks: 0,
    ratingPoster: 0,
    ratingHelper: 0
})

// - 取得點數狀態 -
const pointBarSwiperShow = ref(false)
const _work = '取得點數狀態'
try {
    const response = await getProfileStatus()
    if (response && checkRespStatus(response)) {
        const { data } = response
        Object.keys(status.value).forEach((key) => {
            if (data[key]) {
                status.value[key] = data[key];
            }
        });
        pointBarSwiperShow.value = true
    }
    logInfo(_work, response);
} catch (error) {
    logError(_work, { error });
}

</script>

<style scoped>
.pointBarSwiper {
    margin-left: 0;
    width: 850px;
    height: auto;
}

.swiper-slide {
    display: flex;
}

.box {
    width: 130px;
    height: 110px;
}
</style>