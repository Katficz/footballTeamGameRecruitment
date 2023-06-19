//store
import { createPinia } from "pinia";

const pinia = createPinia();

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
library.add(faBackward);
library.add(faForward);
library.add(faPlus);
library.add(faPenToSquare);
library.add(faTrash);
library.add(faMagnifyingGlass);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import "@/assets/global.css";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(i18n)
  .use(pinia)
  .use(router)
  .mount("#app");
