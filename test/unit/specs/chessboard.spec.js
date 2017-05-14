import Vue from 'vue'
import Chessboard from '@/components/chessboard/chessboard.vue'

describe('chessboard.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Chessboard)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelectorAll('.square').length)
      .to.equal(128)
  })
})
