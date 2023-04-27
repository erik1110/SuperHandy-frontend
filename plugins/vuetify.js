import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const myCustomLightTheme = {
    dark: false,
    colors: {
      background: "#FFFFFF",
      surface: "#FFFFFF",
      primary: "#2ec4b6",
      "primary-lighten": "#cbf3f0",
      secondary: "#ff9f1c",
      "secondary-lighten": "#ffbf69",
      "v-pink": "#FBD4D5",
      "v-orange": "#E68244",
      error: "#B00020",
      info: "#2196F3",
      success: "#57F1B1",
      warning: "#FB8C00",
    },
  };
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    defaults: {
      VAppBar: {
        VBtn: { varient: "text", color: "#fff" },
      },
      VBtn: { color: "primary" },
    },
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
