<template>
    <Swiper class="swiper" :spaceBetween="5" :slidesPerView="1" :modules="[SwiperNavigation]" :breakpoints="{
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
        <SwiperSlide v-for="(item, idx) in imgUrls" :key="idx">
            <div class="sp-me-2 sp-rounded-lg sp-overflow-hidden sp-w-[100px] sp-h-[100px]">
                <v-img cover :src="item" @click="openBigImage" class="hover:sp-cursor-pointer"></v-img>
            </div>
        </SwiperSlide>
        <div class="text-center my-2 sm:sp-hidden">
            <SwiperControls :btnSize="'xsmal'"></SwiperControls>
        </div>
    </Swiper>
</template>
<script setup>
//const { imgUrls } = defineProps(["imgUrls"]);
const imgUrls = [
    'https://source.unsplash.com/featured/300x300',
    'https://source.unsplash.com/featured/400x400',
    'https://source.unsplash.com/featured/500x500',
    'https://source.unsplash.com/featured/600x600'
]

const openBigImage = () => {
    alert('顯示大圖')
}

/*如果只有一个slide就销毁swiper*/
// if (mySwiper.slides.length <= 3) {
//     mySwiper.destroy();
// }

/*如果只有一个slide就不顯示SwiperControls*/

/*點擊圖片顯示大圖*/

</script>
<style scoped>
.swiper {
    margin-left: 0;
    /* 640px = tailwindcss.sm */
    max-width: 640px;
    width: 100%;
    height: auto;
}
</style>