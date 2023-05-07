<template>
  <div>
    <VContainer fluid>
      <VRow>
        <VCol cols="12">
          <!-- avatar start -->
          <VRow class="">
            <VCol class="d-md-flex text-md-start align-md-center">
              <label class="aui-info d-inline-block">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" id="aui-avatar" class="aui-avatar" />
                <input id="uploadImgBtn" style="display:none;" type="file" @change="uploadAvatar">
                <v-icon icon="mdi-camera" size="large" class="aui-camera"></v-icon>
              </label>
              <div class="mt-5 mt-md-0 ml-md-5">
                <p class="text-h5 font-weight-bold">{{ user.firstName }} {{ user.lastName }}</p>
                <p class="text-grey-lighten-1" v-show="user.email">帳號 {{ user.email }}</p>
              </div>

            </VCol>
          </VRow>
          <!-- avatar end -->
          <!-- pointsBar start -->
          <div class="my-5" width="800px">
            <AccountPointsBar />
          </div>
          <!-- pointsBar end -->
          <!-- AccountProfile start -->
          <VRow>
            <VCol class="">
              <AccountProfile />
            </VCol>
          </VRow>
          <!-- AccountProfile end -->
        </VCol>
      </VRow>

    </VContainer>
  </div>
</template>

<script setup>

// definePageMeta({
//   layout: "account"
// })

import { storeToRefs } from 'pinia'
import { storeAccount } from '@/stores/storeAccount'
const { basicBox } = useAlert()


// 取得會員資料
const _storeAccount = storeAccount()
const { getAccount } = _storeAccount
const { user } = storeToRefs(_storeAccount)
onMounted(() => {
  getAccount()
});


//更新頭像
function uploadAvatar() {
  //console.log('uploadAvatar')
  basicBox('還沒寫喔')
}
</script>

<style scoped>
.aui-info {
  position: relative;
  cursor: pointer;
}

.aui-avatar {
  width: 8rem;
  border-radius: 4rem;

}

.aui-camera {
  color: #757575;
  position: absolute;
  bottom: 0.7rem;
  left: 5.8rem;
}


/* md 以上 */
@media(min-width: 960px) {
  /* .aui-camera {
    color: #757575;
    position: absolute;
    top: 5.5rem;
    bottom: 0;
    left: 5.8rem;
    right: 0;
  } */

}
</style>