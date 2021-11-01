import { mount,shallowMount } from "@vue/test-utils";
import ETH from "../../src/components/ETH";
import flushPromises from 'flush-promises'


const allOver = () => new Promise((resolve) => setImmediate(resolve));
describe('ETH', () => {
    // Inspect the raw component options
    it('has data', () => {
        expect(typeof ETH.data).toBe('function')
    })
})

describe('Mounted ETH', () => {
    const wrapper = shallowMount(ETH);

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    // it('should check `componentDidMount()`', () => {
    //     const instance = wrapper.vm; // you assign your instance of the wrapper
    //     jest.spyOn(instance, 'takeAllPOL'); // You spy on the randomFunction
    //     instance.;
    //     expect(instance.randomFunction).toHaveBeenCalledTimes(1); // You check if the condition you want to match is correct.
    // })


    it('renders correctly with different data', async () => {
        // wrapper.vm.$nextTick( () => {
        await wrapper.setData({ arrayValue: 'arrayValue' })
            const item = wrapper.find('.address')
        expect(wrapper.vm.arrayValue).toHaveLength(10)
        await flushPromises()
            expect(typeof item.text()).toBe('string')
    })

})