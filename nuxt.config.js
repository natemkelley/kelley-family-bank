require('dotenv').config({
  path: ".env.local"
})


export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: [
    "@/node_modules/bootstrap/dist/css/bootstrap-grid.css",
    "@/assets/css/main.css",
    "@/assets/css/transitions.css",
    "@/assets/css/colors.scss"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{src:'@/plugins/autoAuth.js',ssr: true}],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    ["@nuxtjs/dotenv", {
      filename: ".env.local"
    }]
  ],
  router: {},
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    [
      "nuxt-fire",
      {
        config: {
          apiKey: process.env.apiKey,
          authDomain: "kelleyfamilyfinances.firebaseapp.com",
          databaseURL: "https://kelleyfamilyfinances.firebaseio.com",
          projectId: "kelleyfamilyfinances",
          storageBucket: "kelleyfamilyfinances.appspot.com",
          messagingSenderId: process.env.messagingSenderId,
          appId: process.env.appId,
          measurementId: process.env.measurementId
        },
        services: {
          auth: {
            initialize: {
              onSuccessAction: 'handleSuccessfulAuthentication',
              ssr: true
            }
          },
          firestore: true,
          functions: true,
          storage: true
        }
      }
    ]
  ],
  styleResources: {
    scss: ["@/assets/css/colors.scss"]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
