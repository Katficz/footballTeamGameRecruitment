<template>
  <div class="p-medium">
    <span class="main-title">
      {{ mainTitle }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    mainTitle: {
      type: String,
      required: true,
    },
  },
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.main-title {
  font-size: x-large;
}
</style>
