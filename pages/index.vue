<template>
  <div>
    <!-- Sec-1-CTA -->
    <div class="wrapper 2xl:sp-min-h-[85vh]">
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
    <!-- Sec-2-Intors -->
    <HomeSecWrapper class="section-2 sp-py-20 " bgColor="sp-bg-primary-lighten">
      <div ref="sec2Img" class="sm:sp-basis-1/2 sp-flex-center">
        <img class="sp-max-w-[450px] sp-min-w-[300px]" src="../assets/images/bg/bg-s2-left.png" alt="">
      </div>

      <div class="sm:sp-basis-1/2 sp-flex-center sp-flex-col">
        <div class="introCard sp-mb-4 sp-mx-2 sp-hidden" v-for="(cardData, idx) in intro" :key="idx">
          <HomeIntroCard :card-data="cardData" />
        </div>
      </div>
    </HomeSecWrapper>
    <div ref="showIntroCard"></div>

    <!-- Sec-3-Counters -->
    <HomeSecWrapper bgColor="sp-bg-primary">
      <div v-for="(cnt, idx) in _countData" :key="idx" class="sp-basis-full sm:sp-basis-1/2 sp-p-8 sp-max-w-[450px]">
        <HomeCounter class="counterItem" v-bind="cnt" />
      </div>
    </HomeSecWrapper>
    <div ref="startCount"></div>

    <!-- Sec-4-CompletedCase -->
    <HomeSecWrapper class="s4">
      <div class="s4_left md:sp-border-r-2">
        <HomeSteper class="sp-mb-8" v-for="(step, idx) in steps" :key="idx" :step-data="step" />
      </div>
      <div class="sp-grow sp-py-4 lg:sp-pl-8">
        <HomeCompletedCard v-for="item in completedCaseData" :key="item._id" :card-data="item" />
      </div>
      <div class="sp-basis-full sp-mt-8">
        <div class="sp-flex-center sp-mb-20 ">
          <NuxtLink to="/post-task/-1">
            <v-btn class="text-white" max-width="200" color="v-purple" rounded>立即刊登任務
              <v-icon class="mt-1">mdi-arrow-right</v-icon>
            </v-btn>
          </NuxtLink>
        </div>
        <Bg_s4 class="s4_bg" />
      </div>
    </HomeSecWrapper>

    <!-- Sec-5-Helpers -->
    <HomeSecWrapper bgColor="sp-bg-primary-lighten" class="sm:sp-py-32" nowrap="true">
      <div class="sp-flex-none sp-border-l-[12px] sp-border-primary sp-pl-4 sp-mb-4 sp-w-full sm:sp-w-auto sm:sp-mr-20 ">
        <h2 class="sp-text-h2 sp-mb-4">最優秀的超<br />人幫手</h2>
        <p>讓超人幫手成為你的得力助手</p>
      </div>
      <div
        class="sp-flex-initial sp-max-w-full md:sp-max-w-md lg:sp-max-w-lg xl:sp-max-w-4xl   sp-items-center sp-hidden sm:sp-flex">
        <Swiper :slides-per-view="4" :space-between="10" :loop="true" :modules="[SwiperNavigation]"
          :navigation="{ nextEl: '.slideNext-btn' }" :breakpoints="{
            '320': {
              slidesPerView: 2
            },
            '1280': {
              slidesPerView: 4
            },
          }">
          <SwiperSlide v-for="(h, idx) in helpers" :key="idx">
            <HomeHelperCard @click="openUserDialog(h)" v-bind="h" />
          </SwiperSlide>
        </Swiper>
        <v-btn class="slideNext-btn ml-5" color="#fff" density="comfortable" icon="mdi-arrow-right"></v-btn>
      </div>
      <div class="sp-flex-initial sp-basis-full sm:sp-hidden">
        <HomeHelperCard @click="openUserDialog(h)" v-for="(h, idx) in helpersSm" :key="idx" v-bind="h" />
      </div>

    </HomeSecWrapper>

    <!-- Sec-6-Comments -->
    <HomeSecWrapper class="s6">
      <div class="sp-text-h3 sp-basis-full sp-text-center sp-my-8">
        超過 <span class="sp-text-purple">500+</span> 則真實評價
      </div>
      <div class="s6_right sm:sp-justify-between">
        <HomeCommentCard class="hover:sp--translate-y-2 sp-transition-all" v-bind="c" v-for="(c, idx) in comments"
          :key="idx" />
      </div>
      <Bg_s6 class="s6_bg" />
    </HomeSecWrapper>
    <!-- UserModal -->
    <HomeUserModal :dialog="userDialog" :data="helper" @close="userDialog = false" />
  </div>
</template>

<script setup>
import Bg_s4 from "@/assets/images/bg/bg-s4.svg"
import Bg_s6 from "@/assets/images/bg/bg-s6.svg"
import {
  getCompletedCases,
  getTaskStats,
  getExcellentHelpers,
  getCompletedReviews,
} from '@/services/apis/home'
import homeData from "@/static/home.json"
const { intro, countData, steps } = homeData


onMounted(async () => {
  await initData()
  parallaxInit()
  observerSec2()
  observerSec3()
})
/*
  Init Data
*/
const completedCaseData = ref([])
const helpers = ref([])
const helpersSm = computed(() => {
  if (helpers.value.length > 4) {
    return helpers.value.slice(0, 4)
  } else {
    return helpers.value
  }
})
const comments = ref([])
const fetchCompletedCases = async () => {
  try {
    let { data } = await getCompletedCases()
    completedCaseData.value = data.slice(0, 5)
  } catch (err) {
    console.log({ err });
  }
}
const fetchTaskStats = async () => {
  let res = await getTaskStats()
  console.log({ res });
}
const fetchExcellentHelpers = async () => {
  let { data } = await getExcellentHelpers()
  helpers.value = data
}
const fetchCompletedReviews = async () => {
  let { data } = await getCompletedReviews()
  comments.value = data
}
const initData = async () => {
  await fetchCompletedCases()
  await fetchTaskStats()
  await fetchExcellentHelpers()
  await fetchCompletedReviews()
}
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
  window.addEventListener('mousewheel', windowMousewheel, { passive: true })
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
  sec5-Helpers
*/
// modal
const helper = ref({})
const userDialog = ref(false)
const openUserDialog = (item) => {
  userDialog.value = true
  helper.value = item
}



</script>
<style scoped lang="postcss">
.secContainer {
  @apply sp-flex sp-flex-row sp-mx-auto sp-flex-wrap
}

.s4_left {
  @apply sp-basis-1/3 sp-py-10 sp-grow sp-mx-auto sp-max-w-[450px] sp-flex sp-flex-col sp-justify-between sp-items-center sp-border-slate-200
}

.s6_right {
  @apply sp-w-full sp-flex sp-justify-center sp-flex-wrap
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
  transform: translateZ(-30px) scale(4);
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

.s4_bg {
  position: absolute;
  bottom: 0;
  right: 5%;
  z-index: -1;
}

.s6_bg {
  position: absolute;
  top: 0;
  left: 5%;
  z-index: -1;
}
</style>
