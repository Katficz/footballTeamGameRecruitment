import { VueWrapper, config, mount, shallowMount } from "@vue/test-utils";
import InternsTable from "@/modules/interns/pages/internsList/InternsTable.vue";

const mockedInterns: Array<{ fullName: string; id: string; avatar: string }> = [
  {
    avatar: "test",
    fullName: "Paw Kot",
    id: "10",
  },
];

config.global.mocks = {
  $t: (text: string) => text,
};

describe("test interns table", () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = mount(InternsTable, {
      props: {
        items: mockedInterns,
      },
    });
  });
  it("display interns name", () => {
    const fullNameCol = wrapper.find('[data-test="name-col"]');
    expect(fullNameCol.text()).toContain(mockedInterns[0].fullName);
  });

  it("emits edit on click with right id", () => {
    wrapper.get('[data-test="editButton"]').trigger("click");
    expect(wrapper.emitted()).toHaveProperty("edit");
    expect(wrapper.emitted().edit).toEqual([["10"]]);
  });

  it("emits delete on click with right id", () => {
    wrapper.get('[data-test="deleteButton"]').trigger("click");
    expect(wrapper.emitted()).toHaveProperty("delete");
    expect(wrapper.emitted().delete).toEqual([["10"]]);
  });
});
