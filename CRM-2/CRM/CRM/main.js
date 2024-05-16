import "./util/pc.js"
import Vue from 'vue'
import App from './App'
import myRequest from './util/util.js'
Vue.config.productionTip = false
Vue.prototype.$http=myRequest
App.mpType = 'app'
// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);
const app = new Vue({
    ...App
})
app.$mount()

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
