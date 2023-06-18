<template>
  <div>
    <span class="items-wrapper" @click="$emit('previous')">
      <font-awesome-icon :icon="['fas', 'backward']" />
    </span>
    <span
      v-for="index in maxPages"
      @click="$emit('goTo', index)"
      :key="index"
      class="items-wrapper"
      :class="index == page ? 'highlight' : ''"
    >
      {{ index }}
    </span>
    <span class="items-wrapper" @click="$emit('next')">
      <font-awesome-icon :icon="['fas', 'forward']" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["next", "previous", "goTo"],
  props: {
    page: {
      type: Number,
      default: 1,
    },
    maxPages: {
      type: Number,
      default: 1,
    },
  },
  name: "PaginationFooter",
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
span {
  background-color: white;
  color: green;
  border: 1px solid rgba(0, 128, 0, 0.342);
  padding: 8px;
  &:hover {
    cursor: pointer;
    background-color: rgb(197, 197, 197);
  }
  color: green;
}

.highlight {
  background-color: green;
  color: white;
}
</style>
