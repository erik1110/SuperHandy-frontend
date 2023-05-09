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
const testData = ref({})

onMounted(async () => {
  parallaxInit()
})
/* Init */
// sec1-滾動視差
let windowMousewheel = () => {
  let wrapper = document.querySelector("html");
  let content = document.querySelector(".wrapper");
  if (content.scrollTop + content.clientHeight < content.scrollHeight && event.deltaY > 0) {
    content.scrollTop += event.deltaY / 2;
  } else if (wrapper.scrollTop < content.clientHeight && event.deltaY < 0) {
    content.scrollTop += event.deltaY / 2;
  }
}
const parallaxInit = () => {
  window.addEventListener('mousewheel', windowMousewheel)
}
onUnmounted(async () => {
  window.removeEventListener("mousewheel", windowMousewheel);
});

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

.title {
  max-width: 350px;
}
</style>
