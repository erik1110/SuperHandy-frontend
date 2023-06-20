<template>
    <div class="sp-border-primary-lighten sp-border-2 sp-rounded-lg sp-h-full">
        <div class="sp-py-8 sp-px-3">
            <div class="sp-text-center sp-space-y-2">
                <div class="sp-text-xl sp-font-bold sp-text-gray-placeholder">{{ data.title }}</div>
                <div class="bg-svg sp-mx-auto" :class="data.image"></div>
                <div class="sp-text-purple sp-ps-4 sp-py-4 sp-flex sp-items-center sp-justify-center">
                    <span class="sp-text-5xl sp-font-bold">{{ data.coin }}</span>
                    <span class="sp-text-base sp-font-normal">&nbsp;&nbsp;/&nbsp;點</span>
                </div>
            </div>
            <div v-if="data.comments" class="sp-text-center">
                <v-chip color="indigo" size="small" prepend-icon="mdi-alert-circle" class="px-5">
                    {{ data.comments }}
                </v-chip>
            </div>
        </div>
    </div>
</template>
<script setup>
const { data } = defineProps(['data'])
</script>
<style scoped lang="scss">
.bg-svg {
    width: 24px;
    height: 24px;

    &.superCoin {
        background: url("@/assets/images/svg/superCoin.svg") center center / contain no-repeat;
    }

    &.helperCoin {
        background: url("@/assets/images/svg/helperCoin.svg") center center / contain no-repeat;
    }
}
</style>