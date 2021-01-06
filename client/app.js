import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

sync(store, router)
Vue.use(VueI18n)
Vue.use(ElementUI)

window.eventBus = new Vue();

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

export { app, router, store }
