<template>
  <div class="sp-space-y-4">
    <!-- 案主 -->
    <AccountPerformanceBar :data="hosterData"></AccountPerformanceBar>
    <!-- 幫手 -->
    <AccountPerformanceBar :data="helperData"></AccountPerformanceBar>
  </div>
</template>
<script setup>
const { hosterData,helperData } = defineProps(["hosterData","helperData"]);
</script>

