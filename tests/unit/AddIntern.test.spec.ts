import { config, mount, shallowMount } from "@vue/test-utils";
import AddEditInternPage from "@/modules/interns/pages/AddEditInternPage.vue";
import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

const mockedIntern: Intern = {
  avatar: "test",
  first_name: "Paw",
  last_name: "Kot",
  id: "10",
};
const route = {
  query: {
    id: "10",
  },
};

jest.mock("@/modules/interns/api/interns.api", () => {
  return {
    fetchInternById: (id: string) => mockedIntern,
  };
});
jest.mock("vue-router", () => {
  return {
    useRoute: () => route,
    useRouter: () => {
      jest.fn();
    },
  };
});

config.global.mocks = {
  $t: (text: string) => text,
};

describe("test add edit interns", () => {
  it("loads proper data to inputs on enter", () => {
    setActivePinia(createPinia());
    const wrapper = mount(AddEditInternPage, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    const firstNameInputValue = wrapper.get('[data-test="editButton"]').text();
    const secondNameInputValue = wrapper.get('[data-test="editButton"]').text();

    expect(firstNameInputValue).toBe(mockedIntern.first_name);
    expect(wrapper).toBeTruthy();
  });
});
