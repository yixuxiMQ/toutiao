import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载 vant 组件库
import Vant from 'vant'

// 加载 vant 组件库样式
import 'vant/lib/index.css'

// 自动设置 REM 基准值（HTML 标签字体大小）
import 'amfe-flexible'

// 加载全局样式
import './styles/index.less'

import '@/utils/dayjs'

// 全局注册 vant 组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
