// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// bootstrap4
import BootstrapVue from 'bootstrap-vue'
// import BScroll from 'better-scroll'

import toastr from 'toastr'
// import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
// import '@/styles/bootstrap/css/bootstrap.css'
import '@/styles/css/AdminLTE.css'
import Vuex from 'vuex'

import '@/styles/bootstrap/css/bootstrap4.css'
// import '@/styles/bootstrap/css/bootstrap-theme.css'

import '@/styles/css/dropload.css'
import '@/styles/font-awesome-4.7.0/css/font-awesome.css'
import '@/styles/css/main.css'
import '@/styles/css/index.css'
import '@/styles/toastr/toastr.css'
// import * as toastr from '@/styles/toastr/toastr.min'
/* eslint-disable */
import '@/styles/toastr/toastr.min'
import '@/styles/js/jquery-3.2.1'
import '@/styles/bootstrap/js/bootstrap'
import '@/styles/css/animate.min.css'

// chat js
import '../static/js/sockjs.min'
import '../static/js/stomp'

// Simditor js
import '../static/simditor/styles/simditor.css'
import '../static/simditor/scripts/module'
import '../static/simditor/scripts/hotkeys'
import '../static/simditor/scripts/uploader'
import '../static/simditor/scripts/simditor'
import '../static/js/progressbar'

import '../static/js/dropload'

import VueCookies from 'vue-cookies'


/* eslint-disable */
import $ from 'jquery'

// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.use(toastr)
// Vue.use(ElementUI) // 使用vue-element-admin
Vue.use(toastr)
Vue.use(BootstrapVue)
Vue.use(VueCookies) // cookies
Vue.use(Vuex)

// Vue.use(BScroll)
Vue.config.productionTip = false

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}



// Vue.http.options.emulateJSON = false;
// Vue.http.options.emulateJSON = true;
Vue.http.options.xhr = { withCredentials: true };
Vue.http.interceptors.push((request, next) => {
  // 判断token是否存在，如果存在将每个页面header都添加token
  // if (window.localStorage.getItem('token')){
  //   Vue.http.headers.common['Authentication-Token'] =  window.localStorage.getItem('token')
  //   console.log('请求后台。。。')
  //   console.log(window.localStorage.getItem('token'))
  // }
  // 携带上cookie，解决跨域问题
  request.credentials = true
  next()
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
