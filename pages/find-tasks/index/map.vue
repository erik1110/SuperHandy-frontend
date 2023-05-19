<template>
  <ClientOnly>
    <div class="sp-h-[60vh] sp-min-h-[600px]">
      <LMap ref="map" id="map" :zoom="zoomLevel" :center="mapCenter">
        <LMarker
          v-for="(t, idx) in tasks"
          :key="idx"
          :lat-lng="[t.location.latitude, t.location.longitude]"
        >
          <LIcon
            :icon-url="t.isUrgent ? pinUrgentImg : pinImg"
            :icon-size="[32, 44]"
            :icon-anchor="[16, 43]"
            :popup-anchor="[0, -40]"
          />
          <LPopup>
            <div class="sp-flex sp-justify-between sp-items-center sp-mb-3">
              <h3 class="sp-text-h5 sp-whitespace-nowrap sp-mr-2">
                {{ t.title }}
              </h3>
              <div v-if="t.isUrgent" class="fireIcon sp-flex-center">
                <FireIcon class="sp-icon-sm sp-text-white" />
              </div>
            </div>
            <div class="sp-flex sp-items-center sp-my-2">
              <MapPinIcon class="sp-icon-xs sp-mr-1 sp-text-purple" />
              {{ t.location.city }}{{ t.location.dist }}
            </div>

            <p class="my-3">
              <span class="tile">服務類型</span># {{ t.category }}
            </p>
            <p class="my-3"><span class="tile">案主</span>{{ t.poster }} **</p>
            <p class="my-3"><span class="tile">聯絡電話</span>09-26XXX-XXX</p>
            <p class="my-3">
              <span class="tile">案件預算</span>
              <span class="sp-text-purple sp-font-semibold sp-text-body-sm"
                >{{ t.salary }} 超人幣</span
              >
            </p>
            <p class="sp-text-caption sp-text-slate-500">
              <span class="sp-pr-2 sp-mr-1 sp-border-r sp-border-slate-400"
                >刊登時間 10 分鐘前</span
              >
              {{ t.inquiriesCount }} 人詢問
            </p>
            <v-btn color="v-purple">
              <v-icon class="mr-1">mdi-cursor-pointer</v-icon>
              查看詳情</v-btn
            >
          </LPopup>
        </LMarker>
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></LTileLayer>
      </LMap>
    </div>
  </ClientOnly>
</template>

<script setup>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import { MapPinIcon, FireIcon } from "@heroicons/vue/24/solid";
import pinImg from "@/assets/images/pin.png";
import pinUrgentImg from "@/assets/images/pin_urgent.png";
import tasksMock from "@/static/tasks_mock.json";
const tasks = ref(tasksMock);
/*
  Map
*/
const zoomLevel = ref(16);
const mapCenter = ref([25.034436016196786, 121.56407163196346]);
const checkCenter = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      // console.log("Latitude: " + latitude + ", Longitude: " + longitude);
      mapCenter.value = [latitude, longitude];
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
    mapCenter.value = [25.034436016196786, 121.56407163196346];
  }
};
onMounted(() => {
  checkCenter();
});
</script>

<style lang="postcss" scoped>
.fireIcon {
  @apply sp-bg-warning sp-rounded-md sp-w-8 sp-h-8;
}
.tile {
  @apply sp-text-body-sm sp-font-medium sp-text-slate-500 sp-w-16 sp-inline-block sp-mr-1;
}
</style>
