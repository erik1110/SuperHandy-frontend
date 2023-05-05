<template>
    <div class="d-flex justify-start">
        <Swiper class="mySwiper" :modules="[SwiperFreeMode, SwiperPagination]" :freeMode="true" :slidesPerView="1"
            :spaceBetween="10" :breakpoints="{
                '360': {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                '480': {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                '600': {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                '750': {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            }">
            <SwiperSlide v-for=" i  in  3 ">
                <div class="box bg-amber d-flex align-center justify-center">
                    <div class="text-center">
                        <div class="d-flex align-center justify-center">
                            <span class="sp-text-2xl sp-font-medium pr-1">100</span>
                            <v-icon icon="mdi-star-circle" size="x-small"></v-icon>
                        </div>
                        <p class="sp-text-sm">超人幣</p>
                    </div>
                </div>
                <div class="box bg-amber d-flex align-center justify-center">
                    <div class="text-center">
                        <div class="d-flex align-center justify-center">
                            <span class="sp-text-2xl sp-font-medium pr-1">20</span>
                            <v-icon icon="mdi-star-circle" size="x-small"></v-icon>
                        </div>
                        <p class="sp-text-sm">幫手幣</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>
<script setup>

</script>

<style>
.mySwiper {
    margin-left: 0;
    max-width: 800px;
    min-width: 240px;
    width: 100%;
    height: auto;
}

.swiper-slide {
    min-width: 240px;
    min-height: 110;
    display: flex;
    background: #fff;
    margin-right: 1rem;
}

.box {
    min-width: 120px;
    min-height: 110px;
}
</style>