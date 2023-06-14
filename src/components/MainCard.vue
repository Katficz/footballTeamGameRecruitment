<template>
  <div class="main-card">
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainCard",
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
$base-padding: 10px;
.main-card {
  padding: $base-padding;
  background-color: white;
  border-radius: 7px;
  width: calc(100% - calc($base-padding * 2));
  min-height: 100%;
  margin: auto;
}
</style>
