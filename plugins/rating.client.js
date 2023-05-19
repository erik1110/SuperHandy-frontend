import StarRating from "vue-star-rating";
import 'default-passive-events'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("StarRating", StarRating);
});
