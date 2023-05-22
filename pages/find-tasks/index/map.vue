<template>
  <ClientOnly>
    <div class="sp-h-[60vh] sp-min-h-[600px] sp-relative">
      <v-btn
        v-if="showReFetch.b || showReFetch.z"
        class="px-2 reFetchBtn"
        style="z-index: 999"
        rounded="xl"
        size="small"
        color="secondary-darken"
        variant="outlined"
        elevation="5"
        @click="getData"
        >搜尋此區域</v-btn
      >
      <v-overlay
        v-model="loading"
        contained
        class="align-center justify-center"
      >
        <div class="sp-card-wrapper sp-bg-white sp-p-4">
          <v-progress-circular
            color="secondary-darken"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-overlay>
      <LMap
        ref="map"
        id="map"
        :zoom="zoomLevel"
        :center="mapCenter"
        @update:zoom="zoomUpdated"
        @update:bounds="boundsUpdated"
      >
        <LControl position="topleft">
          <div @click="getPosition" class="nowLocation hover:sp-bg-slate-100">
            <v-icon color="v-purple">mdi-crosshairs-gps</v-icon>
          </div>
        </LControl>
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></LTileLayer>
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
            <FindTasksTitleWrap :title="t.title">
              <div v-if="t.isUrgent" class="fireIcon sp-flex-center">
                <FireIcon class="sp-icon-sm sp-text-white" />
              </div>
            </FindTasksTitleWrap>

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
  LControl,
} from "@vue-leaflet/vue-leaflet";
import { MapPinIcon, FireIcon } from "@heroicons/vue/24/solid";
import pinImg from "@/assets/images/pin.png";
import pinUrgentImg from "@/assets/images/pin_urgent.png";
import tasksMock from "@/static/tasks_mock.json";
const tasks = ref(tasksMock);
const loading = ref(false);
/*
  Get Data
*/
const getData = () => {
  console.log("get data");
  showReFetch.value = { b: false, z: false };
};
/*
  Map
*/
const map = ref(null);
const zoomLevel = ref(16);
const mapCenter = ref([25.034436016196786, 121.56407163196346]);
const mapCenterBackup = ref([25.034436016196786, 121.56407163196346]);
const showReFetch = ref({ b: false, z: false });
const getPosition = async () => {
  if (navigator.geolocation) {
    loading.value = true;
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      // console.log("Latitude: " + latitude + ", Longitude: " + longitude);
      mapCenter.value = [latitude, longitude];
    });
    setTimeout(() => {
      loading.value = false;
    }, 3000);
  } else {
    console.log("Geolocation is not supported by this browser.");
    mapCenter.value = [25.034436016196786, 121.56407163196346];
  }
};
// 中心點更新
const centerUpdated = () => {
  let c = map.value.leafletObject.getCenter();
  console.log({ c });
  mapCenterBackup.value = [c.lat, c.lng];
};
// 超出地圖顯示範圍，顯示重新搜尋按鈕
const boundsUpdated = (bounds) => {
  let isContainCenter = map.value.leafletObject
    .getBounds()
    .contains(mapCenterBackup.value);
  if (!isContainCenter) {
    showReFetch.value.b = true;
    centerUpdated();
  } else {
    showReFetch.value.b = false;
  }
};
const zoomUpdated = (zoom) => {
  console.log({ zoom });
  if (zoom < 15) {
    showReFetch.value.z = true;
  } else {
    showReFetch.value.z = false;
  }
};
</script>

<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.fireIcon {
  @apply sp-bg-warning sp-rounded-md sp-w-8 sp-h-8;
}
.tile {
  @apply sp-text-body-sm sp-font-medium sp-text-slate-500 sp-w-16 sp-inline-block sp-mr-1;
}
.nowLocation {
  @apply sp-bg-white sp-rounded-full sp-w-9 sp-h-9 sp-flex-center sp-border-2 sp-border-[#0004] sp-transition-all;
}
.reFetchBtn {
  @apply sp-absolute sp-top-4 sp-left-[50%] -sp-translate-x-[50%] sp-text-body-sm sp-bg-white;
}
</style>
