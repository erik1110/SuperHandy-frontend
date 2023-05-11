<template>
  <div>
    <!-- Sec-1-CTA -->
    <div class="wrapper">
      <header>
        <img src="../assets/images/bg/bg-1.png" class="back" />
        <img src="../assets/images/bg/bg-2.png" class="fore" />
        <div class="sp-flex sp-flex-col sp-items-center">
          <img src="../assets/images/bg/slogon.png" class="sp-max-w-sm sp-mb-4" />
          <NuxtLink to="/find-tasks/list">
            <v-btn class="text-white" max-width="100" color="v-purple" rounded>成為幫手</v-btn>
          </NuxtLink>
        </div>
      </header>
    </div>
    <!-- Sec-2-Intor -->
    <section class="sp-bg-[#DFDFFF] section-2 sp-relative sp-py-10 ">
      <div class="flexCenter sp-max-w-[900px] secContainer lg:sp-flex-nowrap">
        <div ref="sec2Img" class="sm:sp-basis-1/2 sp-p-8 sp-max-w-[450px] sp-min-w-[300px]">
          <img src="../assets/images/bg/bg-s2-left.png" alt="">
        </div>

        <div class="sm:sp-basis-1/2 flexCenter sp-flex-col">
          <div class="introCard sp-mb-4 sp-mx-2 sp-hidden" v-for="(cardData, idx) in intro" :key="idx">
            <HomeIntroCard :card-data="cardData" />
          </div>
        </div>
      </div>
    </section>
    <div ref="showIntroCard"></div>
    <!-- Sec-3-Counter -->
    <section class="sp-bg-[#0C0D50] sp-relative sp-py-10 ">
      <div class="flexCenter sp-max-w-[600px] secContainer lg:sp-flex-nowrap">
        <div v-for="(cnt, idx) in _countData" :key="idx" class="sp-basis-1/2 sp-p-8 sp-max-w-[450px]">
          <HomeCounter class="counterItem" v-bind="cnt" />
        </div>
      </div>
    </section>
    <div ref="startCount"></div>

    <!-- Sec-4-CompletedCase -->
    <section class=" sp-pt-20 sp-pb-8 sp-max-w-[900px] sp-flex secContainer sp-flex-nowrap">
      <div
        class="sp-basis-1/3 sp-py-10 sp-grow sp-max-w-[450px] sp-flex sp-flex-col sp-justify-between sp-items-center sp-border-slate-200 md:sp-border-r-2">
        <HomeSteper class="sp-mb-8" v-for="(step, idx) in steps" :key="idx" :step-data="step" />
      </div>
      <div class="sp-grow sp-py-4 lg:sp-pl-8">
        <HomeCompletedCard v-for="item in completedCaseData" :key="item._id" :card-data="item" />
      </div>
    </section>
    <div class="flexCenter sp-mb-20">
      <v-btn class="text-white" max-width="200" color="v-purple" rounded>立即刊登任務
        <v-icon class="mt-1">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
    <section class="sp-bg-[#DFDFFF] sp-py-10 "></section>

    <!-- <section class="sp-bg-[#0C0D50] sp-h-[60vh]">
      <Counter />
    </section> -->

  </div>
</template>

<script setup>
import { ArrowSmallRightIcon } from "@heroicons/vue/24/solid";
import { getCompletedCases, getAccountProfile } from '@/services/apis/home'
import homeData from "@/static/home.json"
const { intro, countData, steps } = homeData


onMounted(async () => {
  parallaxInit()
  await fetchCompletedCases()
  observerSec2()
  observerSec3()
})
/* 
  sec1-滾動視差
*/
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
/* 
  sec2-IntroCard動畫
*/
const sec2Img = ref(null)
const showIntroCard = ref(null)
const observerSec2 = () => {
  const animateEl = document.querySelectorAll('.introCard'); // 取得 .animate 元素
  // 創建一個新的 IntersectionObserver 監聽器
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // section2 left 
        sec2Img.value.classList.add('animate__animated', 'animate__pulse')
        // section2 right
        animateEl.forEach((el, idx) => {
          el.classList.remove('sp-hidden')
          el.classList.add('animate__animated', 'animate__slideInRight', 'animate__fast', `animate__delay-${idx}s`)
        }) // 元素進入可視區域，添加 .animated 類別
        observer.unobserve(entry.target); // 停止監聽該元素
      }
    }, {
      root: null,
      rootMargin: "30px",
      threshold: 1,
    });
  });
  // 監聽 .animate 元素是否進入可視區域
  observer.observe(showIntroCard.value);
}
/* 
  sec3-動畫+counter
*/
const startCount = ref(null)
const _countData = ref(countData)
const observerSec3 = () => {
  const animateEl = document.querySelectorAll('.counterItem');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateEl.forEach((el, idx) => {
          el.classList.add('animate__animated', 'animate__pulse', `animate__delay-1s`)
        })
        _countData.value.forEach(el => {
          countDown(el)
        })
        observer.unobserve(entry.target); // 停止監聽該元素
      }
    });
  });
  // 監聽 .animate 元素是否進入可視區域
  observer.observe(startCount.value);
}
const countDown = async (item) => {
  setInterval(() => {
    if (item.count < item.target) {
      item.count += 2;
    }
  }, 2);

}
/* 
  sec4-CompletedCase
*/
//Fetch
const completedCaseData = ref([])
const fetchCompletedCases = async () => {
  try {
    let { data } = await getCompletedCases()
    completedCaseData.value = data.slice(0, 5)
  } catch (err) {
    console.log({ err });
  }
}

</script>
<style scoped lang="postcss">
.secContainer {
  @apply sp-flex-row sp-mx-auto sp-flex-wrap
}
</style>
<style scoped lang="scss">
.wrapper {
  height: 75vh;
  max-height: 600px;
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
}
</style>
