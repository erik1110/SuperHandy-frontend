<template>
  <client-only>
    <div v-if="pointBarSwiperShow && status" class="d-flex justify-start">
      <Swiper
        class="pointBarSwiper"
        :modules="[SwiperFreeMode, SwiperPagination]"
        :freeMode="true"
        :spaceBetween="10"
        :slidesPerView="1"
        :breakpoints="{
          '130': {
            slidesPerView: 0.5,
            spaceBetween: 10,
          },
          '260': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '335': {
            slidesPerView: 1.25,
            spaceBetween: 10,
          },
          '400': {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          '530': {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          '670': {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          '810': {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }"
        :observer="true"
        :observeParents="true"
      >
        <SwiperSlide>
          <AccountStatusBox
            text="超人幣"
            :number="status.superCoin"
            icon="mdi-star-circle"
          ></AccountStatusBox>
          <AccountStatusBox
            text="幫手幣"
            :number="status.helperCoin"
            icon="mdi-star-circle"
          ></AccountStatusBox>
        </SwiperSlide>
        <SwiperSlide>
          <AccountStatusBox
            text="發案數"
            :number="status.numOfPostTasks"
            icon=""
          ></AccountStatusBox>
          <AccountStatusBox
            text="已接任務"
            :number="status.numOfCompletedTasks"
            icon=""
          ></AccountStatusBox>
        </SwiperSlide>
        <SwiperSlide>
          <AccountStatusBox
            text="案主評價"
            :number="status.ratingPoster.toFixed(2)"
            icon="mdi-star"
          ></AccountStatusBox>
          <AccountStatusBox
            text="幫手評價"
            :number="status.ratingHelper.toFixed(2)"
            icon="mdi-star"
          ></AccountStatusBox>
        </SwiperSlide>
      </Swiper>
    </div>
  </client-only>
</template>
<script setup>
  import { getProfileStatus } from "@/services/apis/account";
  const { checkRespStatus } = useHttp();
  const { logInfo, logError } = useLog();
  const status = ref({
    superCoin: 0,
    helperCoin: 0,
    numOfPostTasks: 0,
    numOfCompletedTasks: 0,
    ratingPoster: 0,
    ratingHelper: 0,
  });

  // - 取得點數狀態 -
  const pointBarSwiperShow = ref(false);
  const _work = "取得點數狀態";
  try {
    const response = await getProfileStatus();
    if (response && checkRespStatus(response)) {
      status.value = response.data;
      pointBarSwiperShow.value = true;
    }
    logInfo(_work, response);
  } catch (error) {
    logError(_work, { error });
  }
</script>

<style scoped>
  .pointBarSwiper {
    margin-left: 0;
    max-width: 850px;
    width: 80vw;
    height: auto;
    /* border: 2px solid #ff0000; */
  }

  .swiper-slide {
    width: 260px;
    display: flex;
  }
</style>
