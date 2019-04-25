import Vue from 'vue'
import Router from 'vue-router'
import assignment from '@/components/assignment'
import signup from '@/components/signup'
import login from '@/components/login'
import StarRating from 'vue-star-rating'
import VeeValidate from 'vee-validate'

Vue.use(Router)
Vue.component('star-rating', StarRating)
Vue.use(VeeValidate)

export default new Router({
  routes: [
    {
      path: '/assignment',
      name: 'assignment',
      component: assignment
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
