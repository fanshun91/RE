import Vue from 'vue'

import { Button } from 'vue-antd-ui'

import App from './app.vue'

Vue.config.productionTip = false

Vue.component(Button.name, Button)

// 渲染实例
new Vue({
  render: h => h(App)
}).$mount('#root') // 挂载在build/index.html
