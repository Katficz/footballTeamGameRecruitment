<template>
  <button class="add-button" @click="$emit('add')">
    <font-awesome-icon data-test="icon" v-if="icon?.length != 0" :icon="icon" />
    {{ text }}
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "NiceButton",
  props: {
    icon: {
      type: Array as PropType<string[]>,
      required: false,
    },
    text: {
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

<style scoped lang="scss">
.add-button {
  height: 30px;
  color: white;
  background-color: green;
  border-radius: 15px;
  border: none;
  padding: 7px;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 128, 0, 0.637);
  }
}
</style>
