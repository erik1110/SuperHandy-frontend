<template>
  <div>
    <VContainer fluid
      ><VRow>
        <VCol>
          <V-tabs
            class="sp-inline-block"
            v-model="identityTabs"
            color="v-purple"
            bg-color="primary-lighten"
          >
            <v-tab value="poster"
              ><NuxtLink class="point" to="/account/tasks/poster"
                >案主任務</NuxtLink
              ></v-tab
            >
            <v-tab value="helper"
              ><NuxtLink class="point" to="/account/tasks/helper"
                >幫手任務</NuxtLink
              ></v-tab
            >
          </V-tabs>
        </VCol>
      </VRow>
      <VRow>
        <VCol><NuxtPage></NuxtPage></VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
  const route = useRoute();
  const identityTabs = useState("poster");
  if (route.path == "/account/tasks") {
    navigateTo("/account/tasks/poster");
  }
</script>

<style lang="scss" scoped></style>
