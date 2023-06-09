<template>
  <div>
    <VContainer fluid>
      <VRow>
        <VCol>
          <v-card class="sp-mb-4" v-for="(item, index) in historyList" :key="index">
            <v-card-text>
              <!-- history title -->
              <div class="sp-min-h-[20px] sp-mb-2">
                <span class="sp-text-title" v-show="item.taskId">
                  #{{ item.taskId }}
                </span>
                <div class="sp-float-right sp-px-2 sp-py-1 sp-border-2 sp-border-solid sp-border-gray-500 sp-rounded-sm">
                  {{ item.role }}
                </div>
              </div>
              <!-- history tag -->
              <h5 class="sp-text-h5 sp-mb-2 sp-ml-[-8px]">
                【{{ item.tag }}】
              </h5>
              <!-- history message  -->
              <div class="sp-text-body sp-mb-2" :class="[
                {
                  'sp-text-green-500':
                    item.money.platform > 0 || item.money.superCoin > 0,
                },
                {
                  'sp-text-red-500': item.money.superCoin < 0,
                },
              ]">
                <!-- helper had platform -->
                <template v-if="item.money.platform != 0">
                  +{{ item.money.salary }}({{ item.money.platform }} 平台費，{{
                    item.money.superCoin
                  }}
                  超人幣)：{{ item.desc.toString() }}
                </template>
                <template v-else>
                  <template v-if="item.money.superCoin > 0">+</template>{{ item.money.superCoin + item.money.helperCoin
                  }}({{
  item.money.superCoin
}}
                  超人幣<template v-if="item.money.helperCoin != 0">，{{ item.money.helperCoin }} 幫手幣</template>)：{{
                    item.desc.toString() }}
                </template>
              </div>
              <!-- history create date -->
              <div class="sp-text-body">
                {{ new Date(item.createdAt).toLocaleString() }}
              </div>
            </v-card-text>
          </v-card>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
<script setup>
import { getAccountPointsHistory } from "@/services/apis/point";
const historyList = ref([]);
const FuncGetAccountPointsHistory = async function () {
  let res = await getAccountPointsHistory();
  console.log(res);
  if (!res.error) {
    historyList.value = res.data;
  } else {
  }
};
onMounted(() => {
  FuncGetAccountPointsHistory();
});
</script>
