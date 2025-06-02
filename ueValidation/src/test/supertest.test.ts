import {expect,vi, test} from "vitest";
import {mount} from "@vue/test-utils";
import App from "@/App.vue";

test("mount component", async () => {
    expect(App).toBeTruthy();
    const wrapper = mount(App);

    expect(wrapper.text()).toContain("Registrierung");
})

test("button is invalid default", async () => {
    const wrapper = mount(App);

    const button = wrapper.find("button");

    expect(button.attributes("disabled")).toBeDefined();
});

test("shows error when first name is empty and blurred", async () => {
    const wrapper = mount(App);
    const firstNameInput = wrapper.find('[data-testid="first-name"]');

    await firstNameInput.trigger("blur");

    expect(wrapper.text()).toContain("Fehler beim Namen");
});

test("shows error when passwords do not match", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-testid="password"]').setValue("123456");
    await wrapper.find('[data-testid="password-repeat"]').setValue("abcdef");
    await wrapper.find('[data-testid="password-repeat"]').trigger("blur");

    expect(wrapper.text()).toContain("Fehler bei der Passwortwiederholung");
});

test("submits form when all fields are valid", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-testid="first-name"]').setValue("Max");
    await wrapper.find('[data-testid="last-name"]').setValue("Mustermann");
    await wrapper.find('[data-testid="email"]').setValue("max@example.com");
    await wrapper.find('[data-testid="birthday"]').setValue("1990-01-01");
    await wrapper.find('[data-testid="phone-number"]').setValue("123456789");
    await wrapper.find('[data-testid="password"]').setValue("geheim");
    await wrapper.find('[data-testid="password-repeat"]').setValue("geheim");

    window.alert = vi.fn();
    await wrapper.find("button").trigger("click");

    expect(window.alert).toHaveBeenCalledWith("Form Submitted");
});
test("submit button is disabled if not all fields are valid", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-testid="first-name"]').setValue("Max");
    await wrapper.find('[data-testid="email"]').setValue("ungültig-email");
    await wrapper.find('[data-testid="password"]').setValue("pw");
    await wrapper.find('[data-testid="password-repeat"]').setValue("anders");

    const button = wrapper.find("button");

    expect(button.attributes("disabled")).toBeDefined();
});


