import Vue from 'vue'
import './plugins/vuetify'
import Vuelidate from 'vuelidate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPercent, faMeh, faSmileBeam, faGrinBeam, faSmileWink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
Vue.use(Vuelidate)
library.add(faPercent, faMeh, faSmileBeam, faGrinBeam, faSmileWink)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
