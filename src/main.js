import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ViewUIPlus from "view-ui-plus";
import "view-ui-plus/dist/styles/viewuiplus.css";
import axios from "axios";
import VueAxios from "vue-axios";
import common from "./commom";

// axios.defaults.headers.common["Content-Type"] =
//   "application/x-www-form-urlencoded";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

import "@progress/kendo-theme-default/dist/all.css";

import { Grid } from "@progress/kendo-vue-grid";

import saveExcel from "@progress/kendo-vue-excel-export";

createApp(App)
  .use("Grid", Grid)
  .use(saveExcel)
  .use(router)
  .mixin(common)
  .use(ViewUIPlus)
  .use(VueAxios, axios)
  .mount("#app");
