// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import VueLongPress from 'vue-long-press-directive'
import { TableComponent, TableColumn } from 'vue-table-component'
import {Tabs, Tab} from 'vue-tabs-component'
import VueApexCharts from 'vue-apexcharts'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VueGAPI from 'vue-gapi'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import ArrowRightBoldCircle from 'vue-material-design-icons/ArrowRightBoldCircle.vue'
import Close from 'vue-material-design-icons/Close.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'

library.add(faEnvelope, faFacebook, faTwitter, faInstagram)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('arrow-right-bold-circle', ArrowRightBoldCircle)
Vue.component('close', Close)
Vue.component('chevron-right', ChevronRight)
Vue.component('chevron-left', ChevronLeft)

Vue.component('table-component', TableComponent)
Vue.component('table-column', TableColumn)
Vue.component('tabs', Tabs)
Vue.component('tab', Tab)
Vue.component('apexchart', VueApexCharts)

Vue.use(VeeValidate)
Vue.use(VueLongPress, { duration: 1000 })
Vue.use(VueApexCharts)
Vue.use(VueFire)
Vue.use(Vuex)
Vue.use(VueGAPI, process.env.GOOGLE_API_CREDENTIALS)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    applicationOpen: true
  }
})

const firebaseApp = firebase.initializeApp(process.env.FIREBASE_CONF)

export const db = firebaseApp.firestore()
const settings = {timestampsInSnapshots: true}
db.settings(settings)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
