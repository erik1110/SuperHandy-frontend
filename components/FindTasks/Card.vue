<template>
  <div class="sp-card-wrapper sp-bg-white sp-p-4 lg:sp-p-6 sp-mb-4">
    <FindTasksTitleWrap title="協助清除居家害蟲">
      <div class="fireIcon sp-flex-center sp-flex-col">
        <FireIcon class="sp-icon-md sp-text-white" />
        <p class="sp-text-caption sp-text-white">急件</p>
      </div>
    </FindTasksTitleWrap>
    <div
      class="sp-flex sp-items-center sp-my-2 sp-gray-placeholder sp-text-body-sm"
    >
      <MapPinIcon class="sp-icon-xs sp-mr-1 sp-text-purple" />
      <!-- {{ t.location.city }}{{ t.location.dist }} -->
      台中市西屯區
    </div>
    <div
      class="sp-bg-gray-border sp-rounded-lg sp-flex sp-justify-around sp-py-4 sp-px-2 sp-mb-4"
    >
      <div>
        <p class="tile">服務類型</p>
        <p>#生活服務</p>
      </div>
      <div>
        <p class="tile">案主</p>
        <p>葉 O 奇</p>
      </div>
      <div>
        <p class="tile">聯絡電話</p>
        <p>09-26XXX-XXX</p>
      </div>
      <div>
        <p class="tile">案件預算</p>
        <p class="sp-text-purple sp-font-semibold sp-text-body-sm">
          3,000 超人幣
        </p>
      </div>
    </div>
    <div class="sp-mb-4">
      <p class="sp-text-body-sm sp-mb-1">任務說明</p>
      <div
        class="sp-text-body-sm sp-whitespace-pre-line sp-text-gray-placeholder"
      >
        J 個任務非常緊急，因為 OO
        超級大並且為複數，已經對家中造成生態浩劫。我非常需要你的英勇與犧牲(X)速速前來支援，阿咪豆腐。
      </div>
    </div>
    <div class="sp-mb-6">
      <p class="sp-text-body-sm sp-mb-1">任務照片</p>
      <div
        class="sp-rounded-lg sp-overflow-hidden sp-max-w-[90px] sp-max-h-[90px]"
      >
        <v-img
          cover
          src="https://images.unsplash.com/photo-1683656017639-bc622715c153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        />
      </div>
    </div>
    <div class="sp-flex sp-items-center">
      <p class="sp-ml-auto sp-mr-3 sp-text-caption sp-text-slate-500">
        <span class="sp-pr-2 sp-mr-1 sp-border-r sp-border-slate-400"
          >刊登時間 10 分鐘前</span
        >
        6 人詢問
      </p>
      <v-btn color="v-purple">
        <v-icon class="mr-1">mdi-cursor-pointer</v-icon>
        查看詳情</v-btn
      >
    </div>
  </div>
</template>

<script setup>
  import { MapPinIcon, FireIcon } from "@heroicons/vue/24/solid";
</script>

<style lang="postcss" scoped>
  @import url("@/assets/css/tailwind.css");
  .fireIcon {
    @apply sp-bg-warning sp-rounded-md sp-w-10 sp-h-10;
  }
  .tile {
    @apply sp-text-body-sm sp-font-medium sp-text-slate-500 sp-w-16 sp-inline-block sp-mr-1;
  }
</style>
