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
    <div class="sp-bg-[#DFDFFF] sp-h-[100vh]"></div>
    <div class="sp-bg-[#0C0D50] sp-h-[100vh]">
      <Counter />
    </div>

  </div>
</template>

<script setup>
import { getCompletedCases } from '@/services/apis/home'
const testData = ref({})

onMounted(async () => {
  try {
    let { data } = await getCompletedCases()
    // console.log(data);
    testData.value = data
  } catch (err) {
    console.log({ err });
  }

})

</script>

<style scoped lang="scss">
.wrapper {
  height: 85vh;
  overflow-y: auto;
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
