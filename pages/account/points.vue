<template>
  <div>
    <VContainer fluid
      ><VRow>
        <VCol>
          <V-tabs color="secondary">
            <v-tab>
              <NuxtLink class="point" to="/account/points/">點數詳情</NuxtLink>
            </v-tab>
            <v-tab>
              <NuxtLink to="/account/points/history">點數歷史</NuxtLink>
            </v-tab>
            <v-tab>
              <NuxtLink to="/account/points/exchange">點數兌換</NuxtLink>
            </v-tab>
          </V-tabs>
        </VCol>
      </VRow>
    </VContainer>
    <NuxtPage />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .router-link-active:not(.point) {
    color: #b7eeee;
  }
</style>
