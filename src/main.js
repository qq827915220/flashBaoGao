import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import store from './store'
import './mock'
import 'iview/dist/styles/iview.css'
import bus from './utils/eventBus'
import LazyLoad from './utils//lazyLoad'

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(LazyLoad);
Vue.prototype.$bus = bus;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
