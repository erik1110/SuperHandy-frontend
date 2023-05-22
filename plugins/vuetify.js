import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const myCustomLightTheme = {
    dark: false,
    colors: {
      background: "#FFFFFF",
      surface: "#FFFFFF",
      primary: "#0C0D50",
      "primary-lighten": "#DFDFFF",
      secondary: "#B7EEEE",
      "secondary-darken": "#60c4c4",
      "v-purple": "#5658FB",
      "v-orange": "#E68244",
      "v-gray-text": "#222222",
      "v-gray-placeholder": "#717171",
      "v-gray-border": "#DDDDDD",
      "v-gray-bg": "#F3F3F3",
      error: "#B00020",
      info: "#B7EEEE",
      success: "#DFDFFF",
      warning: "#FB8C00",
    },
  };
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    defaults: {
      VAppBar: {
        VBtn: { varient: "text", color: myCustomLightTheme.colors.primary },
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
