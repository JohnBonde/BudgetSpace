import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import AuthService from "./AuthService"

//Vue.config.productionTip = false

async function init() {
  let user = await AuthService.Authenticate()
  if (user) { store.commit("setUser", user) }
  else { router.push({ name: 'login' }) }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
init()
