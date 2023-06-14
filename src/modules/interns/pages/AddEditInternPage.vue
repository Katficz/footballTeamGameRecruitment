<template>
  <div>
    <main-title class="m-bottom-md" :mainTitle="$t('pageTitles.addIntern')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import MainTitle from "@/components/MainTitle.vue";

export default defineComponent({
  name: "AddEditInternPage",
  components: { MainTitle },
  setup() {
    return {};
  },
});
</script>
