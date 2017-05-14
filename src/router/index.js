import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Chessboard from '@/components/chessboard/chessboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/chess',
      name: 'Chessboard',
      component: Chessboard
    }
  ]
})
