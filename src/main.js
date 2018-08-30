// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueCarousel from 'vue-carousel'
import VeeValidate from 'vee-validate'
import { TableComponent, TableColumn } from 'vue-table-component'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
// import { faAngleDoubleRight } from '@fortawesome/free-directional-svg-icons'
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

Vue.use(VueCarousel)
Vue.use(VeeValidate)
Vue.use(VueFire)
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    applicationOpen: true
  }
})

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAXlUSXffb-DekBZwqy5dLfRHrBLW3rgcA',
  authDomain: 'engineeringconference-b41cb.firebaseapp.com',
  databaseURL: 'https://engineeringconference-b41cb.firebaseio.com',
  projectId: 'engineeringconference-b41cb',
  storageBucket: 'engineeringconference-b41cb.appspot.com',
  messagingSenderId: '1034600001201'
})

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
