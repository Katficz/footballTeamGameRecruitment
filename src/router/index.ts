import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import InternsListPage from "../modules/interns/pages/InternsListPage.vue";
import AddEditInternPage from "../modules/interns/pages/AddEditInternPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/lista",
    name: "InternsList",
    component: InternsListPage,
  },
  {
    path: "/dodaj",
    name: "PreviewOneIntern",
    component: AddEditInternPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
