<template>
  <div class="sp-space-y-4">
    <!-- 關於案主 start -->
    <div class="sp-bg-gray-bg sp-p-4 sp-rounded-lg">
      <div class="text-center lg:sp-flex lg:sp-space-x-20 lg:sp-items-center">
        <div class="sp-font-bold sp-mb-2 lg:sp-mb-0">
          關於案主
          <span class="mdi mdi-menu-right sp-hidden lg:sp-inline-block"></span>
          <span class="mdi mdi-menu-down lg:sp-hidden"></span>
        </div>
        <div class="sp-flex sp-justify-between sp-space-x-2 lg:sp-space-x-10">
          <div class="number-wrap sp-text-purple">
            <NuxtLink :to="siteConfig.linkPaths.points.to">
              <span class="number">{{ performanceData.superCoin }}</span>
            </NuxtLink>
            <span class="sp-inline-block">超人幣</span>
          </div>
          <div class="number-wrap sp-text-gray-placeholder">
            <span class="number sp-inline-block">{{
              performanceData.numOfPostTasks
            }}</span>
            <span class="sp-inline-block">發案數</span>
          </div>
          <div class="number-wrap sp-text-gray-placeholder">
            <div class="sp-inline-block">
              <NuxtLink :to="siteConfig.linkPaths.comments.to">
                <span class="number sp-text-gray-placeholder">{{
                  performanceData.ratingPoster
                }}</span>
              </NuxtLink>
            </div>
            <span class="sp-inline-block">星評價</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 關於案主 end -->
    <!-- 關於幫手 start -->
    <div class="sp-bg-gray-bg sp-p-4 sp-rounded-lg">
      <div class="text-center lg:sp-flex lg:sp-space-x-20 lg:sp-items-center">
        <div class="sp-font-bold sp-mb-2 lg:sp-mb-0">
          關於幫手
          <span class="mdi mdi-menu-right sp-hidden lg:sp-inline-block"></span>
          <span class="mdi mdi-menu-down lg:sp-hidden"></span>
        </div>
        <div class="sp-flex sp-justify-between sp-space-x-2 lg:sp-space-x-10">
          <div class="number-wrap sp-text-purple">
            <NuxtLink :to="siteConfig.linkPaths.points.to">
              <span class="number">{{ performanceData.helperCoin }}</span>
            </NuxtLink>
            <span class="sp-inline-block">幫手幣</span>
          </div>
          <div class="number-wrap sp-text-gray-placeholder">
            <span class="number sp-inline-block">{{
              performanceData.numOfCompletedTasks
            }}</span>
            <span class="sp-inline-block">接案數</span>
          </div>
          <div class="number-wrap sp-text-gray-placeholder">
            <div class="sp-inline-block">
              <NuxtLink :to="siteConfig.linkPaths.comments.to">
                <span class="number sp-text-gray-placeholder">{{
                  performanceData.ratingHelper
                }}</span>
              </NuxtLink>
            </div>

            <span class="sp-inline-block">星評價</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 關於幫手 end -->
  </div>
</template>
<script setup>
  import { siteConfig } from "@/services/siteConfig";
  const { performanceData } = defineProps(["performanceData"]);
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
