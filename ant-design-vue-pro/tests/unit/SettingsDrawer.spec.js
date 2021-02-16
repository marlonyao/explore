import { mount } from "@vue/test-utils";
import SettingsDrawer from "@/components/SettingsDrawer";

describe("Settings Drawer", () => {
  const wrapper = mount(SettingsDrawer);
  it("render html", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
