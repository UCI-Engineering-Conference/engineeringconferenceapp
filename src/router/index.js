import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', component: 'Home' },
  { path: '/about', component: 'About' },
  { path: '/meettheteam', component: 'MeetTheTeam' },
  { path: '/schedule', component: 'ConferenceSchedule' },
  { path: '/sponsors', component: 'Sponsors' },
  { path: '/contact', component: 'ContactUs' },
  { path: '/secretpage', component: 'SecretPage' },
  { path: '/jointheteam', component: 'JoinTheTeam' },
  { path: '/application', component: 'Application' },
  { path: '*', component: 'Home' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
