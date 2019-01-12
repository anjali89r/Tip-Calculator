import { shallowMount } from '@vue/test-utils'
import TipCalculator from '@/components/TipCalculator.vue'

describe('TipCalculator.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(TipCalculator, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
