import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('Snapshots SongItem.vue', () => {
  test('Snapshot SongItem.vue', () => {
    const song = {
      docID: 'abc',
      modified_name: 'test',
      display_name: 'test',
      comment_count: 5,
      modified_name: 'test',
    }

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
