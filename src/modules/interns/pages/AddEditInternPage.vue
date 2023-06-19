<template>
  <div>
    <main-title class="m-bottom-md" :mainTitle="$t('pageTitles.addIntern')" />
    <div class="row">
      <main-card class="m-bottom-md data-col">
        <div class="input-wrapper">
          <label for="firstName">{{ $t("addEditUser.firstName") }}</label>
          <input
            maxlength="40"
            class="text-data-input"
            name="firstName"
            type="text"
            v-model="intern.first_name"
          />
        </div>
        <div class="input-wrapper">
          <label for="lastName">{{ $t("addEditUser.lastName") }}</label>
          <input
            maxlength="40"
            class="text-data-input"
            name="lastName"
            type="text"
            v-model="intern.last_name"
          />
        </div>
        <div class="button-wrapper">
          <button class="save-button" @click="handleSave">
            {{ $t("addEditUser.updateDetails") }}
          </button>
        </div>
      </main-card>

      <main-card class="m-bottom-md avatar-col">
        <div class="image-wrapper">
          <img class="image-cell" :src="intern.avatar" alt="alternatetext" />
        </div>
        <div class="avatar-input-wrapper">
          <input
            :placeholder="$t('addEditUser.changePhoto')"
            class="avatar-input"
            type="text"
            v-model="intern.avatar"
          />
        </div>
      </main-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
//components
import MainTitle from "@/components/MainTitle.vue";
import MainCard from "@/components/MainCard.vue";
import { useRoute } from "vue-router";
import { fetchInternById } from "@/modules/interns/api/interns.api";
import { useInternsStore } from "../store/interns.store";
import router from "@/router";

export default defineComponent({
  name: "AddEditInternPage",
  components: { MainTitle, MainCard },
  setup() {
    const internsStore = useInternsStore();
    const intern = ref({
      id: "",
      first_name: "",
      last_name: "",
      avatar:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHwAfAMBIgACEQEDEQH/xAAbAAEBAQADAQEAAAAAAAAAAAAABQQCAwYBB//EADMQAAIBAwAHBQYHAQAAAAAAAAABAgMEEQUSISIxQVETYXGxwSMyNHKBkjNCUmKRsvEU/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP0kAAAAAAAAA+qLfBN/QD4A9gAAAAAAAAAAAAAABrs7GpcYlLcp9eb8Bo+1/wCirrTXs48e99C4kksIDoo2dCit2mm+strNAAHGdOFRYnGMl3rJgudFwkm6D1JdHwZRAHmakJU5uE4uMlxTOJevrVXFPYvaR91+hBaw8PiAAAAAAAAAACWWl1A9BY0lStoRxtay/FmgIAAAAAAAh6UpKndNpbJrWLhL00vwX4ryAlgAAAAAAADgAB6anNTpxmuEkmjkTtE3GtTdGT3o7V4FEAAAAAAEjTU06tOC/Ksv6/4VZyjCLlJ4ills87cVXXrSqPm9ncgOsAAAAAAAAAAcqc5U5qcHiUdqZcs72FzHDajU5x6+BItbWrcy3FiPOT4IsW1lSt1lLWn+pgaQAAOM5xhFynJRS5s5HGcIzi4zSknyYEbSF67h9nTyqaf3GIp3ejMJzt/sfoTGmm01hrkwAAAAAAAABssLJ3D16mVT/sddjbO5rYeyEdsn6F+MVGKikklwSA+QhGEVGKSiuCRyAAAAAAABkvbKFwtaO7V5Pr4msAeZqQlTm4TWJJ4aOJb0jadvT14L2keHf3EQAAAAB2W9Pta9OHWSyBa0fR7G2hs3pbzNQAAAAAAAAAAAACDpOj2V02vdnvL1LxP0zDNCM+cZY/kCOAABs0VHWvI/tTZjN+hviZfI/NAWVwAAAAAAAAAAAAADNpCOtZ1e6OTSdV18NV+R+QHnAAB//9k=",
    });
    const route = useRoute();
    loadData();
    async function loadData() {
      const queryId = route.query.id;
      if (!queryId || Array.isArray(queryId)) return;
      const fetchedIntern = await fetchInternById(parseInt(queryId));
      if (!fetchedIntern) return;
      intern.value = {
        id: fetchedIntern.id || "",
        first_name: fetchedIntern.first_name,
        last_name: fetchedIntern.last_name,
        avatar: fetchedIntern.avatar,
      };
    }

    async function handleSave() {
      let actionSuccess = false;
      if (intern.value.first_name == "" || intern.value.first_name == "")
        return;
      if (intern.value.id == "") {
        actionSuccess = await internsStore.addNewIntern(intern.value);
      } else {
        actionSuccess = await internsStore.editIntern(intern.value);
      }
      if (actionSuccess) router.push({ name: "InternsList" });
    }

    return {
      handleSave,
      intern,
    };
  },
});
</script>

<style scoped lang="scss">
.data-col {
  width: 60%;
  min-width: 400px;
  margin-right: 20px;
  display: table-cell;
  height: 250px;
  @media (max-width: 900px) {
    display: inline-block;
    width: 100%;
  }
  position: relative;
}

.row {
  width: 100%;
  border-spacing: 10px;
  @media (max-width: 900px) {
    display: inline-block;
  }
}
.avatar-col {
  height: 250px;
  display: table-cell;
  width: 28%;
  min-width: 200px;
  @media (max-width: 900px) {
    display: inline-block;
    width: 100%;
  }
  position: relative;
}

.input-wrapper {
  width: 45%;
  margin-left: 10px;
  display: inline-block;
  margin-top: 15px;
}

.text-data-input {
  margin-top: 10px;
  font-size: 15px;
  border: 1px solid rgba(0, 0, 0, 0.158);
  border-radius: 3px;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.342);
    outline: none;
  }
  background-color: white;
}

.button-wrapper {
  height: 50px;
  text-align: left;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin: 15px;
}
.save-button {
  height: 30px;
  color: white;
  background-color: green;
  border-radius: 3px;
  border: none;
  padding: 7px;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 128, 0, 0.637);
  }
}

.image-cell {
  border-radius: 50%;
  text-align: center;
}
.image-wrapper {
  margin-top: 15px;
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
}

.avatar-input-wrapper {
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 6px;
  width: 100%;
  input {
    width: 85%;
    @media (max-width: 900px) {
      width: 95%;
    }
  }
}
</style>
