<template>
  <div>
    <div>
      <span class="input-wrapper">
        <input
          @input="filterInterns"
          v-model="searchValue"
          class="search-input-field"
          type="text"
          :placeholder="$t('usersList.searchForUsers')"
        />
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </span>
      <button class="add-button float-right">
        <font-awesome-icon :icon="['fas', 'plus']" />
        {{ $t("usersList.addUser") }}
      </button>
    </div>
    <table>
      <tr class="row-header text-left">
        <th class="avatar-col"></th>
        <th class="fullName-col">{{ $t("usersList.fullName") }}</th>
        <th class="actions-col">{{ $t("usersList.action") }}</th>
      </tr>
      <tr
        v-for="(item, index) in filteredInterns"
        :key="item.id"
        :class="index % 2 ? 'tr-color-light' : 'tr-color-dark'"
        class="row-container"
      >
        <td class="avatar-col">
          <img class="image-cell" :src="item.avatar" alt="alternatetext" />
        </td>
        <td class="fullName-col">{{ item.fullName }}</td>
        <td class="actions-col">
          <button @click="$emit('edit', item.id)" class="icon-button">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </button>
          <button @click="$emit('delete', item.id)" class="icon-button">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "InternsTable",
  emits: ["delete", "edit", "add"],
  props: {
    items: {
      type: Array as PropType<
        Array<{ fullName: string; id: string; avatar: string }>
      >,
      default: () => [],
    },
  },
  components: {},
  setup(props) {
    const searchValue = ref("");

    watch(
      props,
      () => {
        filteredInterns.value = props.items;
      },
      {
        deep: true,
      }
    );
    const filteredInterns = ref(props.items);
    function filterInterns() {
      if (!searchValue.value) {
        filteredInterns.value = props.items;
        return;
      }
      filteredInterns.value = props.items.filter(
        (item) => item.fullName == searchValue.value
      );
    }

    return {
      filteredInterns,
      filterInterns,
      searchValue,
    };
  },
});
</script>

<style lang="scss" scoped>
$row-height: 60px;
$darker-white: rgb(245, 245, 245);
table {
  margin-top: 20px;
  border-spacing: 0px 15px;
  width: 100%;
}

.icon-button {
  margin-left: 2px;
  border: none;
  background: none;
  &:hover {
    color: red;
    cursor: pointer;
  }
}

.image-cell {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  width: calc($row-height - 15px);
  height: calc($row-height - 15px);
}

.fullName-col {
  width: 65%;
}
.avatar-col {
  width: 10%;
}
.actions-col {
  width: 15%;
}
.tr-color-light {
  background-color: white;
}
.tr-color-dark {
  background-color: $darker-white;
}
.row-container {
  padding: 5px;
  height: $row-height;
}
.row-header {
  margin-bottom: 20px;
}

.search-input-field {
  margin: 5px;
  font-size: 15px;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
  background-color: $darker-white;
}
.input-wrapper {
  background-color: $darker-white;
  padding: 2px 6px;
  display: inline-block;
}

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
