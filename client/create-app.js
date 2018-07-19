import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import Antd from 'vue-antd-ui'
import moment from 'moment'

import App from './app.vue'
import createRouter from './route/router'
import createStore from './store/index'

import 'vue-antd-ui/dist/antd.css'
import './assets/styles/common.css'
import 'moment/locale/zh-cn'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Antd)

Vue.config.productionTip = false
moment.locale('zh-cn')

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
