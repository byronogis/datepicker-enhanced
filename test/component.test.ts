import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../src/MyComponent.vue'

describe('my vue component', () => {
  it('should render', () => {
    const wrapper = mount(MyComponent, {
      props: {
        name: 'peterroe',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
