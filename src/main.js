// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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
import { faAngleDoubleRight } from '@fortawesome/free-directional-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEnvelope, faFacebook, faTwitter, faInstagram, faAngleDoubleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('table-component', TableComponent)
Vue.component('table-column', TableColumn)

Vue.use(VueCarousel)
Vue.use(VeeValidate)
Vue.use(VueFire)
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
  components: { App },
  template: '<App/>'
})
