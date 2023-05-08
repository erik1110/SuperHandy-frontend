<template>
  <div>
    <div class="wrapper">
      <header>
        <img src="../assets/images/bg/bg-1.png" class="back" />
        <img src="../assets/images/bg/bg-2.png" class="fore" />
        <div class="sp-flex sp-flex-col sp-items-center">
          <img src="../assets/images/bg/slogon.png" class="sp-max-w-sm sp-mb-4" />
          <v-btn class="text-white" max-width="100" color="v-purple" rounded>成為幫手</v-btn>
        </div>
      </header>
    </div>
    <section class="sp-bg-[#DFDFFF] sp-h-[100vh] sp-max-h-[600px] section-2 sp-relative">
      <v-container class="sp-flex sp-flex-row">
        <div class="sp-basis-1/2 sp-p-8">
          <img src="../assets/images/bg/bg-s2-left.png" alt="">
        </div>
        <div class="content sp-basis-1/2">
          <IconSmile class="icon"></IconSmile>
          <HomeCard v-for="(cardData, idx) in intro" :card-data="cardData" :key="idx" />
        </div>
      </v-container>
    </section>
    <div class="sp-bg-[#DFDFFF] sp-h-[100vh]">
      <v-btn @click="fetchAccountProfile">getAccountProfile</v-btn>
      {{ profileData }}
    </div>
    <div class="sp-bg-[#0C0D50] sp-h-[100vh]">
      <Counter />
    </div>

  </div>
</template>

<script setup>
import { getCompletedCases, getAccountProfile } from '@/services/apis/home'
import IconSmile from "@/assets/images/icons/smile.svg"
import homeData from "@/static/home.json"
const { intro } = homeData

const testData = ref({})

onMounted(async () => {
  try {
    let { data } = await getCompletedCases()
    // console.log(data);
    testData.value = data
  } catch (err) {
    console.log({ err });
  }
  parallaxInit()
})
const parallaxInit = () => {
  window.addEventListener('mousewheel', function (event) {
    let wrapper = document.querySelector("html");
    let content = document.querySelector(".wrapper");
    if (content.scrollTop + content.clientHeight < content.scrollHeight && event.deltaY > 0) {
      content.scrollTop += event.deltaY / 2;
    } else if (wrapper.scrollTop < content.clientHeight && event.deltaY < 0) {
      content.scrollTop += event.deltaY / 2;
    }
  })
}
// Test: API with token
const profileData = ref({})
const fetchAccountProfile = async () => {
  try {
    let res = await getAccountProfile()
    profileData.value = res.data
  } catch (err) {
    console.log({ err });
  }
}

</script>

<style scoped lang="scss">
.wrapper {
  height: 75vh;
  overflow-y: hidden;
  overflow-x: hidden;
  perspective: 10px;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.wrapper::-webkit-scrollbar {
  display: none;
}

header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transform-style: preserve-3d;
  z-index: -1;
}

.back {
  transform: translateZ(-10px) scale(2);
}

.fore {
  transform: translateZ(-5px) scale(1.5);
}

.back,
.fore {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}

.section-2::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url(../assets/images/bg/bg-s2.png) center no-repeat;
  background-size: contain;
  opacity: 0.8;
  z-index: 1;
  /* Set a specific height */
  // min-height: 500px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
}
</style>
