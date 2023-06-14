//store
import { createPinia } from "pinia";

const pinia = createPinia();

import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

createApp(App).use(pinia).use(router).mount("#app");
