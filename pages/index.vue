<template>
  <div>
    <header class="landing__background sp-flex sp-justify-center">
      <div class="sp-mt-[30px] sp-flex sp-flex-col sp-text-white sp-max-w-[400px]">
        <h1 class="sp-hidden">來一場地圖尋寶<br />
          找到你的任務機會
        </h1>
        <div class="slogon_img"></div>
        <v-btn class="text-white" rounded>成為幫手</v-btn>
        <!-- <v-btn class="sp-mt-4 text-white" color="blue">成為幫手</v-btn> -->
      </div>
    </header>
    <div>Current Count: {{ counter.count }}</div>
    <button @click="counter.increment()">+1</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore();
</script>

<style scoped lang="scss">
.landing__background,
.landing__background::before,
.landing__background::after {
  position: relative;
  left: 0;
  right: 0;
  height: calc(100vh - 3rem);
  min-height: 750px;
}

.landing__background::after {
  height: 100vh;
  position: absolute;
  top: -72px;
  z-index: -1;
  content: '';
  background-image: url('@/assets/images/bg-landing-2.svg');
  background-repeat: no-repeat;
  background-position: center top 4rem;
  background-size: 100%;
}

.slogon_img,
.slogon_img::after {
  position: relative;
  width: 300px;
  min-height: 180px;
  top: 0;
  left: 0;
}

.slogon_img::after {
  content: '';
  position: absolute;
  background-image: url('@/assets/images/slogon.svg');
  background-repeat: no-repeat;
  background-position: center top 4rem;
  background-size: 100%;
}

// .landing__background::before {
//   height: 100vh;
//   position: absolute;
//   top: -72px;
//   z-index: -1;
//   content: '';
//   background: #3dc2eb;

// }
</style>
