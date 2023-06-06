// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1,maximum-scale=1",
      title: "超人幫手",
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
      // script:[
      //   {
      //     src: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.0/socket.io.js"
      //   }
      // ]
    },
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "leaflet/dist/leaflet.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-swiper",
    "@lewebsimple/nuxt3-svg",
    "@nuxt/image-edge",
    'nuxt3-socket.io',
  ],
  socket: {
    // JSON serializable options only.
    // options object to pass when instantiating socket server.
    serverOptions: {}
  },
  experimental: {
    writeEarlyHints: false,
  },
});
