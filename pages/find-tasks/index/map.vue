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
        v-model="_storeFindTasks.loading"
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
        v-model="zoomLevel"
        v-model:zoom="zoomLevel"
        :zoom="zoomLevel"
        :center="mapCenter"
        :min-zoom="12"
        :max-zoom="17"
        @update:zoom="zoomUpdated"
        @update:bounds="boundsUpdated"
      >
        <LControl position="topleft">
          <v-tooltip activator="parent" location="bottom">我的位置</v-tooltip>
          <div @click="getPosition" class="nowLocation hover:sp-bg-slate-100">
            <v-icon color="v-purple">mdi-crosshairs-gps</v-icon>
          </div>
        </LControl>

        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></LTileLayer>
        <LMarker
          v-for="(t, idx) in mapViewTasks"
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

            <p class="mt-4 mb-3">
              <span class="tile">服務類型</span># {{ t.category }}
            </p>
            <p class="my-3"><span class="tile">案主</span>{{ t.posterName }}</p>
            <!-- <p class="my-3"><span class="tile">聯絡電話</span>09-26XXX-XXX</p> -->
            <p class="mt-3 mb-4">
              <span class="tile">案件預算</span>
              <span class="sp-text-purple sp-font-semibold sp-text-body-sm"
                >{{ t.salary }} 超人幣</span
              >
            </p>

            <p class="sp-text-caption sp-text-slate-500">
              <span class="sp-pr-2 sp-mr-1 sp-border-r sp-border-slate-400"
                >刊登時間 {{ fromNow(t.publishedAt) }}</span
              >
              {{ t.viewerCount }} 人詢問
            </p>
            <NuxtLink :to="`/find-task/${t.taskId}`">
              <v-btn block color="v-purple" class="px-3 mt-3">
                <v-icon class="mr-1">mdi-cursor-pointer</v-icon>
                查看詳情</v-btn
              >
            </NuxtLink>
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
  LControlZoom,
} from "@vue-leaflet/vue-leaflet";
import { MapPinIcon, FireIcon } from "@heroicons/vue/24/solid";
import pinImg from "@/assets/images/pin.png";
import pinUrgentImg from "@/assets/images/pin_urgent.png";
import { storeFindTasks } from "~/stores/storeFindTasks";
import { storeToRefs } from "pinia";

// const loading = ref(false);
const { fromNow } = useMoment();
const _storeFindTasks = storeFindTasks();
const { mapViewTasks, mapCenterBackup, mapCenter, zoomLevel } =
  storeToRefs(_storeFindTasks);

/*
  Map
*/
const map = ref(null);
// const zoomLevel = ref(14);
const showReFetch = ref({ b: false, z: false });

const getPosition = async () => {
  if (navigator.geolocation) {
    _storeFindTasks.loading = true;
    navigator.geolocation.getCurrentPosition(function async(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      _storeFindTasks.mapCenter = [latitude, longitude];
      centerUpdated();
    });
    setTimeout(() => {
      _storeFindTasks.loading = false;
    }, 3000);
    setTimeout(() => {
      getData();
    }, 1000);
  } else {
    console.log("Geolocation is not supported by this browser.");
    _storeFindTasks.mapCenter = [25.034436016196786, 121.56407163196346];
  }
};
// 中心點更新
const centerUpdated = () => {
  let c = map.value.leafletObject.getCenter();
  console.log({ c });
  _storeFindTasks.mapCenterBackup = [c.lat, c.lng];
};
// 超出地圖顯示範圍，顯示重新搜尋按鈕
const boundsUpdated = (bounds) => {
  let isContainCenter = map.value.leafletObject
    .getBounds()
    .contains(_storeFindTasks.mapCenterBackup);
  if (!isContainCenter) {
    showReFetch.value.b = true;
    centerUpdated();
  } else {
    showReFetch.value.b = false;
  }
};
const zoomBackup = ref(0);
const zoomUpdated = (zoom) => {
  console.log({ zoom });
  if (zoomBackup.value != zoom) {
    zoomBackup.value = zoom;
    showReFetch.value.z = true;
  }
  // // if (zoom < 13 || zoom > 15) {
  // showReFetch.value.z = true;
  // // }
  calculateRadius(zoom);
};
// zoom 換算成半徑
function calculateRadius(zoom) {
  // 根據縮放級別和地圖投影系統，計算半徑範圍（以米為單位）
  const metersPerPixel =
    (40075016.686 *
      Math.abs(
        Math.cos((map.value.leafletObject.getCenter().lat * Math.PI) / 180)
      )) /
    Math.pow(2, zoom + 8);
  const r = Math.round(metersPerPixel);
  _storeFindTasks.radius = r;
  console.log({ r });
}
/*
  Get Data
*/

const getData = async () => {
  console.log("get data");
  showReFetch.value = { b: false, z: false };
  await _storeFindTasks.fetchMapViewTasks();
};
onMounted(() => {
  getData();
});
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
  @apply sp-cursor-pointer sp-bg-white sp-rounded-full sp-w-9 sp-h-9 sp-flex-center sp-border-2 sp-border-[#0004] sp-transition-all;
}
.reFetchBtn {
  @apply sp-absolute sp-top-4 sp-left-[50%] -sp-translate-x-[50%] sp-text-body-sm sp-bg-white;
}
</style>
