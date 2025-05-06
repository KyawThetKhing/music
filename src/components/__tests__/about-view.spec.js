import About from '@/views/AboutView.vue'
import { mount } from '@vue/test-utils'

describe('AboutView.vue', () => {
  test('renders inner context', () => {
    const wrapper = mount(About, { shallow: true })
    expect(wrapper.text()).toContain('About View')
  })
})
