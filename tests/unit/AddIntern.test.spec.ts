import { config, mount, shallowMount } from "@vue/test-utils";
import AddEditInternPage from "@/modules/interns/pages/AddEditInternPage.vue";
import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
jest.setTimeout(10000);

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
    updateIntern: () => false,
  };
});
jest.mock("vue-router", () => {
  return {
    useRoute: () => route,
    useRouter: () => {
      () => true;
    },
  };
});

config.global.mocks = {
  $t: (text: string) => text,
};

describe("test add edit interns", () => {
  test("loads proper data to inputs on enter", async () => {
    setActivePinia(createPinia());
    const wrapper = mount(AddEditInternPage, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    const firstNameInputValue = wrapper.find('[data-test="first-name-input"]')
      .element as HTMLInputElement;
    const secondNameInputValue = wrapper.find('[data-test="last-name-input"]')
      .element as HTMLInputElement;
    await wrapper.vm.$nextTick();
    expect(firstNameInputValue.value).toContain(mockedIntern.first_name);
    expect(secondNameInputValue.value).toContain(mockedIntern.last_name);
  });
  test("sends correct data when user is added", async () => {
    const wrapper = mount(AddEditInternPage, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const firstNameInputValue = wrapper.find('[data-test="first-name-input"]');
    const secondNameInputValue = wrapper.find('[data-test="last-name-input"]');
    const avatarInputValue = wrapper.find('[data-test="avatar-input"]');

    await firstNameInputValue.setValue(mockedIntern.first_name);
    await secondNameInputValue.setValue(mockedIntern.last_name);
    await avatarInputValue.setValue(mockedIntern.avatar);

    const button = wrapper.find('[data-test="save-button"]');
    await button.trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.intern).toMatchObject(mockedIntern);
  });
});
