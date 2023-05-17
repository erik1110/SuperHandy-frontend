import L from 'leaflet'
// import { LMap, LGeoJson } from '@vue-leaflet/vue-leaflet'

export default defineNuxtPlugin(nuxtApp => {
  // nuxtApp.vueApp.component('LMap', LMap)
  // nuxtApp.vueApp.component('LGeoJson', LGeoJson)
  return {
      provide: {
        L
      }
    }
})