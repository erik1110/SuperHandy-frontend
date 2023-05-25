<template>
    <div class="text-end">
        <label class="sp-cursor-pointer sp-rounded-sm px-4 py-1 bg-indigo d-inline-block mb-2">
            <input style="display:none;" type="file" @change="upload">
            上傳圖片
        </label>
    </div>
    <v-sheet border="lg opacity-12" class="text-body-2 mx-auto pa-5">
        <div class="d-flex justify-center">
            <Swiper class="mySwiper" :modules="[SwiperFreeMode, SwiperPagination]" :freeMode="true" :slidesPerView="1"
                :spaceBetween="15" :breakpoints="{
                        '300': {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        '500': {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        '600': {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        '800': {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }">
                <SwiperSlide v-for='(item, index) in 5' :key='index'>
                    <div>
                        <v-img src="https://vuetifyjs.b-cdn.net/docs/images/graphics/img-placeholder.png" height="100"
                            width="140" cover></v-img>
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
    </v-sheet>
    <ul class="sp-text-sm sp-list-disc sp-pl-5">
        <li>每筆任務最多可上傳5張照片，每張照片大小不超過2MB，只支援JPG、PNG格式。</li>
        <li>上傳照片的第一張為任務介紹圖片</li>
    </ul>
</template>

<script setup>
function upload () {
    alert('還沒寫喔')
}
</script>
<style scoped>
.mySwiper {
    max-width: 875px;
    min-width: 140px;
    width: 100%;
    height: auto;
}

.swiper-slide {
    min-width: 140px;
    min-height: 100px;
    display: flex;
    background: #fff;
}
</style>


