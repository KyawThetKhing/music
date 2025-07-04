import SongItem from '@/components/SongItem.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

describe('SongItem.vue', () => {
  test('render song.display_name', () => {
    const song = {
      display_name: 'test',
    }

    const wrapper = shallowMount(SongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const compositionAuthor = wrapper.find('.text-gray-500')

    expect(compositionAuthor.text()).toBe(song.display_name)
  })

  test('render song.docID in id attribute', () => {
    const song = {
      docID: 'abc',
    }

    const wrapper = shallowMount(SongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`)
  })
})
