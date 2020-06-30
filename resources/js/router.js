import Vue from 'vue'
import VueRouter from 'vue-router'

import Ex from './components/ExampleComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Ex,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

export default router