<template>
    <div>
        <div class='mt-4 md:sp-w-1/2'>
            <label class='label' for="contactInfoName">姓名</label>
            <v-text-field v-model="contactInfoData.name" :rules='currentRules.contactInfoName' :disabled="currentEnabled.contactInfoName" :counter='hintMsgs.counter.contactInfoName'
                :hint="hintMsgs.hint.contactInfoName" id="contactInfoName" @keypress.enter.prevent clearable />
        </div>
        <div class='mt-4 md:sp-w-1/2'>
            <label class='label' for="contactInfoPhone">電話</label>
            <v-text-field v-model="contactInfoData.phone" :rules='currentRules.contactInfoPhone' :hint="hintMsgs.hint.contactInfoPhone" :disabled="currentEnabled.contactInfoPhone" id="contactInfoPhone"
                @keypress.enter.prevent clearable />
        </div>
        <div class='mt-4 md:sp-w-1/2'>
            <label class='label' for="contactInfoEmail">Email</label>
            <v-text-field v-model="contactInfoData.email" :rules='currentRules.contactInfoEmail' :hint="hintMsgs.hint.contactInfoEmail" :disabled="currentEnabled.contactInfoEmail" id="contactInfoEmail"
                @keypress.enter.prevent clearable />
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { storePostTask } from "@/stores/storePostTask";
const _storePostTask = storePostTask();
const { contactInfoData } = storeToRefs(_storePostTask);
// const data = inject('contactInfo')
const hintMsgs = inject('hintMsgs')
const currentRules = inject('currentRules')
const currentEnabled = inject('currentFieldEnabled')
</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.label {
    @apply sp-text-gray-placeholder sp-font-bold sp-mb-2 sp-inline-block
}
</style>