import { defineStore } from "pinia";

interface State {
  internsList: Intern[];
}

export const useInternsStore = defineStore("interns", {
  state: (): State => ({
    internsList: [],
  }),
  getters: {},
  actions: {},
});
