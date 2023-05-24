<template>
  <div v-if="detail">
    <VCard>
      <VCardText>
        <div
          class="sp-border-l-[6px] sp-mb-4 sp-border-secondary sp-text-primary sp-pl-4 sp-text-h5"
        >
          任務資訊
        </div>
        <!-- 任務狀態 -->
        <div
          class="sp-p-4 sp-mb-4 sp-border-solid sp-border-[#DDDDDD] sp-border-2 sp-rounded-md"
        >
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4">任務編號</span>
            <span class="">#{{ detail.taskId }}</span>
          </div>
          <div
            class="sp-float-right sp-py-1 sp-px-4 sp-bg-[#B7EEEE] sp-rounded-2xl sp--translate-y-[26px]"
          >
            {{ detail.status }}
          </div>
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4">發布時間</span>
            <span class="">{{
              new Date(detail.publishedAt).toLocaleString()
            }}</span>
          </div>
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4">我的幫手</span>
            <span class="sp-text-orange-600">{{
              detail.helper ? detail.helper : "待媒合"
            }}</span>
          </div>
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4">我的角色</span>
            <span class="">{{ detail.role }}</span>
          </div>
        </div>
        <!-- 任務敘述 -->
        <div
          class="sp-p-4 sp-mb-2 sp-border-solid sp-border-[#DDDDDD] sp-border-2 sp-rounded-md"
        >
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4">任務名稱</span>
            <span class="">{{ detail.title }}</span>
          </div>
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4">任務薪水</span>
            <span>{{ detail.salary }}</span>
          </div>
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4">任務地點</span>
            <span>{{ detail.address }}</span>
          </div>
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4">任務類型</span>
            <span>{{ detail.category }}</span>
          </div>
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4 sp-flex-shrink-0">任務內容</span>
            <span>{{ detail.description }}</span>
          </div>
          <div class="sp-text-body sp-flex sp-flex-warp">
            <span class="sp-mr-4">任務照片</span>
            <span>
              <LightBox
                v-for="(item, index) in 5"
                class="sp-mr-2 sp-inline-block"
                :key="index"
                image="https://fakeimg.pl/60/"
                bigImage="https://fakeimg.pl/300/"
              />
            </span>
          </div>
          <div
            class="sp-text-body sp-text-right"
            v-if="!detail.progressBar.inProgressAt"
          >
            <VBtn color="secondary" class="sp-mr-2">編輯任務</VBtn>
            <VBtn color="v-gray-bg" class="sp-mr-2">下架任務</VBtn>
            <VBtn color="v-gray-bg-secondary" class="sp-mr-2">刪除任務</VBtn>
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
<script setup>
  const detail = useState("taskDetail");
</script>
