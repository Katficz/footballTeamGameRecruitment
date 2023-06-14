<template>
  <div>
    <main-title class="m-bottom-md" :mainTitle="$t('pageTitles.internsList')" />
    <main-card>
      <div>
        <input type="text" />
        <span class="float-right">
          <button>123</button>
        </span>
      </div>
    </main-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import MainTitle from "@/components/MainTitle.vue";
import MainCard from "@/components/MainCard.vue";

export default defineComponent({
  name: "InternsListPage",
  components: { MainTitle, MainCard },
  setup() {
    return {};
  },
});
</script>
