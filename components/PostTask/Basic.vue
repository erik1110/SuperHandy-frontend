<template>
    <div>
        <div class='mt-4'>
            <label class='label' for='title'>任務標題</label>
            <v-text-field v-model='formData.title' :rules='currentRules.title' :disabled="currentDisabled.title"
                :counter='hintMsgs.counter.title' :hint='hintMsgs.hint.title' placeholder="請輸入任務標題" id="title"
                @keypress.enter.prevent clearable />
        </div>
        <div class='mt-4'>
            <label class='label' for='category'>服務類別</label>
            <v-select v-model='formData.category' :rules='currentRules.category' :disabled="currentDisabled.title"
                :items='taskCategories' item-title='name' item-value='name' placeholder="請選擇服務類別" id="category" clearable>
            </v-select>
        </div>
        <div class='mt-4'>
            <label class='label' for='description'>任務說明</label>
            <v-textarea v-model='formData.description' :rules='currentRules.description'
                :disabled="currentDisabled.description" :counter='hintMsgs.counter.description'
                :hint='hintMsgs.hint.description' placeholder="請輸入任務說明" id="description" clearable />
        </div>
        <div class='mt-4 md:sp-w-1/2 lg:sp-w-1/3'>
            <label class='label' for='salary'>任務薪水</label>
            <v-text-field v-model='formData.salary' :rules='currentRules.salary' :disabled="currentDisabled.salary"
                :hint='hintMsgs.hint.salary' type='number' prefix=$ suffix=超人幣 id="salary" @keypress.enter.prevent />
        </div>
        <div class='mt-4'>
            <label class='label'>曝光方案</label>
            <div class='d-md-flex'>
                <v-radio-group v-model='formData.exposurePlan' v-for='(item, index) in exposurePlans' :key='index'
                    :rules='currentRules.exposurePlan' :disabled="currentDisabled.exposurePlan">
                    <v-radio :label='`${item.title} ${item.price}點`' :value='item.title'></v-radio>
                </v-radio-group>
            </div>
            <div class="sp-text-end">
                <NuxtLink :to="siteConfig.linkPaths.exposurePlan.to" target="_blank">
                    <v-chip class="ma-2 px-10 sp-cursor-pointer" color="secondary-darken" size="small">
                        <v-icon start icon="mdi-magnify"></v-icon>
                        查看曝光方案
                    </v-chip>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { storePostTask } from "@/stores/storePostTask";
import { siteConfig } from "~/services/siteConfig";

// - 從父元件接收資料 -
const hintMsgs = inject('hintMsgs')
const currentRules = inject('currentRules')
const currentDisabled = inject('currentFieldDisabled')

// - 從pinia取得資料 -
const _storePostTask = storePostTask();
const { formData, exposurePlanPoint } = storeToRefs(_storePostTask);
const { exposurePlans, taskCategories, descriptionTemplateList } = storeToRefs(_storePostTask);


// - 選擇服務類別時帶出任務說明 -
watch(() => formData.value.category, (nV, oV) => {
    // 動作是清空就離開
    if (!nV) return;
    // 沒有取到樣板清單就離開
    if (!descriptionTemplateList.value) return;

    // 如果任務說明是空的，就直接帶入樣板
    const newObj = taskCategories.value?.find(item => item.name === nV)
    if (newObj && newObj.template && !formData.value.description) {
        formData.value.description = newObj.template
        return;
    }
    // 只要任務說明是樣板，就可以被替換
    const index = descriptionTemplateList.value.findIndex(item => item === formData.value.description)
    if (index >= 0) {
        formData.value.description = newObj.template
        return;
    }
})


// - 紀錄曝光方案點數 -
watch(() => formData.value.exposurePlan, (nV, oV) => {
    if (nV) {
        const exPlan = exposurePlans.value.find(item => item.title === nV)
        exposurePlanPoint.value = exPlan.price
    }
})

</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.label {
    @apply sp-text-gray-placeholder sp-font-bold sp-mb-2 sp-inline-block
}
</style>