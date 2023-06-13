<template>
    <div v-if="data.cnRole" class="sp-bg-gray-bg sp-p-4 sp-rounded-lg">
        <div class="text-center lg:sp-flex lg:sp-space-x-20 lg:sp-items-center">
            <div class="sp-font-bold sp-mb-2 lg:sp-mb-0">
                {{ data.cnRole }}
                <span class="mdi mdi-menu-right sp-hidden lg:sp-inline-block"></span>
                <span class="mdi mdi-menu-down lg:sp-hidden"></span>
            </div>
            <div class="sp-flex sp-justify-between sp-space-x-2 lg:sp-space-x-10">
                <div  class="number-wrap sp-text-purple">
                    <NuxtLink :to="siteConfig.linkPaths.points.to">
                        <span class="number">{{ data.coin }}</span>
                    </NuxtLink>
                    <span class="sp-inline-block">{{ data.cnCoin }}</span>
                </div>
                <div class="number-wrap sp-text-gray-placeholder">
                    <span class="number sp-inline-block">{{ data.numTasks }}</span>
                    <span class="sp-inline-block">{{ data.cnNumTasks }}</span>
                </div>
                <!-- 評價 start -->
                <div class="number-wrap sp-text-gray-placeholder">
                    <div v-if="data.rating">
                        <div class="sp-inline-block">
                            <NuxtLink :to="siteConfig.linkPaths.comments.to">
                                <span class="number sp-text-gray-placeholder">{{
                                    data.rating
                                }}</span>
                            </NuxtLink>
                        </div>
                        <span v-if="data.rating" class="sp-inline-block">星評價</span>
                    </div>
                    <div v-else >
                        <div class="sp-inline-block">
                            <span class="number sp-text-gray-placeholder">0</span>
                        </div>
                        <span class="sp-inline-block">星評價</span>
                    </div>
                </div>
                <!-- 評價 end -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { siteConfig } from "@/services/siteConfig";
const { data } = defineProps(['data'])
</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.number-wrap {
  @apply sp-text-center max-[500px]:sp-inline-grid sm:sp-w-[150px] sm:sp-text-end;
}

.number {
  @apply sp-font-bold sp-text-xl sm:sp-text-2xl sp-underline sp-me-1 sp-inline-block;
}
</style>