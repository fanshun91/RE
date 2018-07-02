import Vue from 'vue'

import Antd from 'vue-antd-ui'

import App from './app.vue'

Vue.config.productionTip = false

// Vue.component(Button.name, Button)
// Vue.component(Checkbox.name, Checkbox)
// Vue.component(Form.name, Form)
// // Vue.component(Formitem.name, Formitem)
// Vue.component(Input.name, Input)
// Vue.component(Icon.name, Icon)
Vue.use(Antd)

// 渲染实例
new Vue({
  render: h => h(App)
}).$mount('#root') // 挂载在build/index.html
