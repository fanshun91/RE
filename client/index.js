import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import Antd from 'vue-antd-ui'
import moment from 'moment'

import App from './app.vue'
import createRouter from './route/router'
import createStore from './store/index'

import 'vue-antd-ui/dist/antd.css'
import './assets/styles/common.css'
import 'moment/locale/zh-cn'

Vue.config.productionTip = false
moment.locale('zh-cn')

Vue.use(Router)
Vue.use(Vuex)
Vue.use(Antd)

const router = createRouter()
const store = createStore()

// router.beforeEach((to, from, next) => {
//   if (to.fullPath !== '/login' && isLogin) {
//     next()
//   }
// })

// 渲染实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root') // build/index.html
