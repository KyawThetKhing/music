import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('Router', () => {
  test('renders router link', () => {
    const song = {
      docID: 'abc',
    }

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docID },
    })
  })
})
