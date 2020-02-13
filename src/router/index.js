import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', component: 'Home' },
  { path: '/about', component: 'About' },
  { path: '/faq', component: 'FAQ' },
  { path: '/ourteam', component: 'OurTeam' },
  { path: '/schedule', component: 'Schedule' },
  { path: '/sponsors', component: 'Sponsors' },
  { path: '/contact', component: 'ContactUs' },
  { path: '/papersandprojects', component: 'PapersandProjects' },
  { path: '/gallery', component: 'Gallery' },
  { path: '/secretpagebeard', component: 'SecretPage' },
  { path: '/jointheteam', component: 'JoinTheTeam' },
  { path: '/success', component: 'Success' },
  { path: '/error', component: 'Error' },
  { path: '/info', component: 'Info' },
  // { path: '/application', component: 'Application' }, // TODO : Uncomment when application goes live
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
