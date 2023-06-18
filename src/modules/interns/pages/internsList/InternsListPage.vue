<template>
  <div>
    <main-title class="m-bottom-md" :mainTitle="$t('pageTitles.internsList')" />
    <main-card class="m-bottom-md">
      <interns-table
        :items="mappedItems"
        @delete="handleDelete"
        @edit="handleAddEdit"
        @add="handleAddEdit"
      />
    </main-card>
    <pagination-footer
      :page="pagination.page"
      :max-pages="pagination.totalPages"
      @go-to="handleGoToPageChange"
      @next="handleNextPreviousButton('next')"
      @previous="handleNextPreviousButton('prev')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
//components
import MainTitle from "@/components/MainTitle.vue";
import MainCard from "@/components/MainCard.vue";
import InternsTable from "./InternsTable.vue";
import PaginationFooter from "./PaginationFooter.vue";
//misc
import { useRoute, useRouter } from "vue-router";

//store
import { useInternsStore } from "@/modules/interns/store/interns.store";

export default defineComponent({
  name: "InternsListPage",
  components: { MainTitle, MainCard, InternsTable, PaginationFooter },
  setup() {
    const internsStore = useInternsStore();

    const route = useRoute();
    const router = useRouter();
    const pagination = ref({
      page: getPageFromRoute(),
      totalPages: 1,
    });

    function getPageFromRoute() {
      const page = route.query.page;
      if (!page) return 1;
      if (Array.isArray(page)) return 1;
      return parseInt(page);
    }

    function addPageToRoute() {
      router.replace({ query: { page: String(internsStore.getPage) } });
    }

    const mappedItems = ref();

    watch(() => internsStore.internsList, prepareItems, { deep: true });

    loadData();

    async function loadData() {
      await internsStore.fetchData(pagination.value.page);
      pagination.value = {
        page: internsStore.getPage,
        totalPages: internsStore.getTotalPages,
      };
      addPageToRoute();
      prepareItems();
    }

    function prepareItems() {
      const storedInterns = internsStore.getInternsList;
      mappedItems.value = storedInterns.map((intern) => {
        return {
          id: intern.id,
          fullName: `${intern.first_name} ${intern.last_name}`,
          avatar: intern.avatar,
        };
      });
    }

    function handleGoToPageChange(page: number) {
      pagination.value.page = page;
      loadData();
    }

    function handleNextPreviousButton(val: "next" | "prev") {
      if (val == "prev" && pagination.value.page == 1) return;
      if (val == "next" && pagination.value.page == internsStore.getTotalPages)
        return;
      pagination.value.page += val == "next" ? 1 : -1;
      loadData();
    }

    async function handleDelete(id: string) {
      await internsStore.deleteInternById(id);
    }

    async function handleAddEdit(id?: string) {
      router.push({ name: "PreviewOneIntern", query: { id: id || "" } });
    }

    return {
      handleAddEdit,
      pagination,
      mappedItems,
      handleGoToPageChange,
      handleNextPreviousButton,
      handleDelete,
    };
  },
});
</script>
