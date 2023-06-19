import { defineStore } from "pinia";
import {
  addNewIntern,
  deleteInternById,
  fetchInterns,
  updateIntern,
} from "../api/interns.api";

interface State {
  internsList: Intern[];
  totalPages: number;
  page: number;
}

export const useInternsStore = defineStore("interns", {
  state: (): State => ({
    internsList: [],
    totalPages: 1,
    page: 1,
  }),
  getters: {
    getInternsList: (state) => state.internsList,
    getTotalPages: (state) => state.totalPages,
    getPage: (state) => state.page,
  },
  actions: {
    async fetchData(page: number) {
      const fetchedInterns = await fetchInterns(page);
      if (!fetchedInterns) {
        this.page = page;
        this.totalPages = 1;
        this.internsList = [];
        return;
      }
      this.page = fetchedInterns.page;
      this.totalPages = fetchedInterns.total_pages;
      this.internsList = fetchedInterns.data;
    },
    async deleteInternById(id: string) {
      const isDeleted = await deleteInternById(id);
      if (!isDeleted) return;
      const deletedIndex = this.internsList.findIndex(
        (intern) => intern.id == id
      );
      if (deletedIndex == -1) return;
      this.internsList.splice(deletedIndex, 1);
    },
    async addNewIntern(newIntern: Intern) {
      const addedIntern = await addNewIntern(newIntern);
      if (!addedIntern) return false;
      this.internsList.unshift(addedIntern);
      return true;
    },
    async editIntern(editedIntern: Intern) {
      const updatedIntern = await updateIntern(editedIntern);
      if (!updatedIntern) return false;
      const updatedInternIndex = this.internsList.findIndex(
        (intern) => intern.id == editedIntern.id
      );
      if (updatedInternIndex == -1) return true;
      this.internsList[updatedInternIndex] = updatedIntern;
      return true;
    },
  },
});
