import Vue from 'vue'
import Router from 'vue-router'
import Chessboard from '@/components/chessboard/chessboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Chessboard',
      component: Chessboard
    }
  ]
})
