import { mount } from "@vue/test-utils";
import ETH from "../../src/components/ETH";

describe('Test name', ()=> {
    test('check call', async () => {
        const wrapper = mount(ETH, {
        });
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toBe('[]')
        // ETH.methods.takePOL()).toEqual("asd")
    });
    test('check STRING', () => {

        const wrapper = mount(ETH)

        const address = wrapper.find('.address')
        console.log((address.exists()))
        expect(address.exists()).toBe(true)
    });
});