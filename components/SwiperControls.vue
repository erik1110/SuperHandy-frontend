<script setup>
const swiper = useSwiper()
const button = {
    xamall: "x-small",
    small: "small",
    large: "large",
    xlarge: "x-large"
}
const { btnSize } = defineProps(["btnSize"]);
</script>

<template>
    <div class="sp-space-x-4">
        <v-btn :size="button[btnSize] ?? ''" color="#fff" density="comfortable" icon="mdi-arrow-left"
            @click="swiper.slidePrev()"></v-btn>
        <v-btn :size="button[btnSize] ?? ''" color="#fff" density="comfortable" icon="mdi-arrow-right"
            @click="swiper.slideNext()"></v-btn>
    </div>
</template>
