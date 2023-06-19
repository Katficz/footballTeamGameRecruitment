import { mount } from "@vue/test-utils";
import NiceButton from "@/components/NiceButton.vue";

describe("test nice button", () => {
  it("Displays text and icon", () => {
    const wrapper = mount(NiceButton, {
      props: {
        text: "text",
        icon: ["fas", "plus"],
      },
    });
    const icon = wrapper.find('[data-test="icon"]');
    expect(wrapper.text()).toContain("text");
    expect(icon).toBeTruthy();
  });
});
