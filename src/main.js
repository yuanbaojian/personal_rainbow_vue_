// main.js 是项目的入口
// 作用： 1.实例化vue   2.导入插件

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import db from './utils/localStorage'
import 'element-ui/lib/theme-chalk/index.css'
import request from './utils/request'
//引入echarts
import echarts from 'echarts'

//  Vue.use 全局注入一个插件进行使用
Vue.use(ElementUI)
Vue.use(db)
Vue.use({
  install (Vue) {
    Vue.prototype.$db = db
  }
})


//  设置原型， 这个不是全局变量， vuex是全局
// 使用$是为了
// 设置全局都可以使用 直接使用$getRequest
Vue.prototype.$getRequest = request.get;
Vue.prototype.$postRequest = request.post;
Vue.prototype.$deleteRequest = request.delete;
Vue.prototype.$putRequest = request.put;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false


//$mount  挂在到dom元素

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
