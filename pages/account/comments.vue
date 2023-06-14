<template>
  <div>
    <VCard class="sp-mb-4">
      <VCardText>
        <VTabs color="v-purple" v-model="commentTabs">
          <v-tab
            value="poster"
            @click="FuncPageRouter('/account/comments/poster')"
            >案主評價
          </v-tab>
          <v-tab
            value="helper"
            @click="FuncPageRouter('/account/comments/helper')"
            >幫手評價
          </v-tab>
        </VTabs>
      </VCardText>
    </VCard>
    <NuxtPage />
  </div>
</template>

<script setup>
  import { getCategories } from "@/services/apis/general";
  import { storeFullOverlay } from "~/stores/storeFullOverlay";
  const _storeFullOverlay = storeFullOverlay();
  _storeFullOverlay.open();
  const route = useRoute();
  const commentTabs = ref("poster");
  const categories = useState("categories");
  if (route.path == "/account/comments") {
    navigateTo("/account/comments/poster");
  }
  const FuncPageRouter = function (route) {
    navigateTo(route);
  };
  const FuncGetCategories = async function () {
    let res = await getCategories();
    if (!res.error) {
      res.data.unshift({
        name: "全部",
      });
      categories.value = res.data;
    }
  };
  FuncGetCategories();
</script>

<style lang="scss" scoped></style>
