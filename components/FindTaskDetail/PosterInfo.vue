<template>
    <div class="sp-bg-white sp-rounded-2xl sm:sp-mr-6 sp-min-w-[250px] sm:sp-max-w-[300px]">
        <div class="wrap sp-items-center sp-border-b sp-border-slate-300">
            <p class="sp-font-bold">案主資訊</p>
        </div>
        <div class="wrap">
            <p class="sp-w-[56px] title">
                姓名
            </p>
            <p>
                姓名
            </p>
        </div>
        <div class="wrap">
            <p class="sp-w-[56px] title">
                電話
            </p>
            <p>
                電話
            </p>
        </div>
        <div class="wrap">
            <p class="sp-w-[56px] title">
                Email
            </p>
            <p>
                Email
            </p>
        </div>
        <div class="wrap justify-center">
            <v-btn type='button' color="v-orange" class="px-4" rounded=" xl">
                <v-icon class="mt-1">mdi-message-reply-text-outline</v-icon>案主聊天室
            </v-btn>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.wrap {
    @apply sp-flex sp-p-3;
}

.title {
    @apply sp-text-gray-placeholder sp-font-bold
}
</style>
