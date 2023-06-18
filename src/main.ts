import "@babel/polyfill";
import "mutationobserver-shim";
import "./plugins/bootstrap-vue";
//store
import { createPinia } from "pinia";

const pinia = createPinia();

import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import i18n from "./i18n";
import "@/assets/global.css";

createApp(App).use(i18n).use(pinia).use(router).mount("#app");
