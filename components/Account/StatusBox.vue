<template>
    <div class="box bg-amber d-flex align-center justify-center">
        <div class="text-center">
            <div class="d-flex align-center justify-center">
                <span class="sp-text-2xl sp-font-medium pr-1">{{ props.number }}</span>
                <!-- <v-icon :icon="mdi-star-circle" size="x-small"></v-icon> -->
                <v-icon :icon="props.icon" size="x-small" v-if="props.icon"></v-icon>
            </div>
            <p class="sp-text-sm">{{ props.text }}</p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['text', 'number', 'icon'])
</script>

<style scoped>
.box {
    width: 130px;
    height: 110px;
}
</style>