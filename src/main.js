import Vue from 'vue'
import App from './App'
import router from './router'
import jquery from 'jquery'
import bootstrap from 'bootstrap-vue'
import  {FontAwesomeIcon}  from '@fortawesome/vue-fontawesome'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './assets/icon/iconfont.css';
import axios from 'axios'
import rootUrl from '../config/GlobalApi.js'

Vue.use(jquery)
Vue.use(bootstrap)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http=axios;
Vue.prototype.GLOBAL=rootUrl;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
