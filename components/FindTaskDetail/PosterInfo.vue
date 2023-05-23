<template>
    <div class="sp-bg-white sp-rounded-2xl lg:sp-mr-6 lg:sp-w-[250px]">
        <div class="wrap sp-items-center sp-border-b sp-border-slate-300">
            <p class="sp-font-bold">案主資訊</p>
        </div>
        <div class="wrap">
            <p class="sp-w-[56px] title">
                姓名
            </p>
            <p v-if="posterInfoData.lastName">
                <a class="sp-text-purple hover:sp-cursor-pointer" @click="openUserModel">
                    {{ posterInfoData.lastName }}**
                </a>
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
        <div class="wrap justify-center pb-4">
            <v-btn type='button' color="v-orange" class="px-4" rounded=" xl">
                <v-icon class="mt-1">mdi-message-reply-text-outline</v-icon>案主聊天室
            </v-btn>
        </div>
    </div>
    <!-- <HomeUserModal :dialog="userDialog" :data="userData" @close="userDialog = false"></HomeUserModal> -->
</template>

<script setup>
const { posterInfoData } = defineProps(["posterInfoData"]);
const openUserModel = () => {
    alert('api?')
}
</script>

<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.wrap {
    @apply sp-flex sp-px-6 sp-py-3;
}

.title {
    @apply sp-text-gray-placeholder sp-font-bold
}
</style>
