import Vue from 'vue'
import Router from 'vue-router'
import Chess from '@/pages/chess/chess.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Chess',
      component: Chess
    }
  ]
})
