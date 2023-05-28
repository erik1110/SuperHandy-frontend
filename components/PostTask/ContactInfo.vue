<template>
    <div>
        <div class='mt-4 md:sp-w-1/2'>
            <label class='label' for="contactInfoName">姓名</label>
            <v-text-field v-model="data.name" :rules='currentRules.contactInfoName' :counter='hintMsgs.name.counter'
                :hint='hintMsgs.name.hint' id="contactInfoName" @keypress.enter.prevent />
        </div>
        <div class='mt-4 md:sp-w-1/2'>
            <label class='label' for="contactInfoPhone">電話</label>
            <v-text-field v-model="data.phone" :rules='currentRules.contactInfoPhone' id="contactInfoPhone"
                @keypress.enter.prevent />
        </div>
        <div class='mt-4 md:sp-w-1/2'>
            <label class='label' for="contactInfoEmail">Email</label>
            <v-text-field v-model="data.email" :rules='currentRules.contactInfoEmail' id="contactInfoEmail"
                @keypress.enter.prevent />
        </div>
    </div>
</template>
<script setup>
const data = inject('contactInfo')
const hintMsgs = inject('hintMsgs')
const currentRules = inject('currentRules')
</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.label {
    @apply sp-text-gray-placeholder sp-font-bold sp-mb-2 sp-inline-block
}
</style>