import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './firebase/firebase'

Vue.config.productionTip = false
//TODO: Kolla ifall användare är inloggad

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
