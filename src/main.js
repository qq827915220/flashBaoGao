import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import store from './store'
import './mock'
import 'iview/dist/styles/iview.css'
import bus from './components/eventBus'

Vue.config.productionTip = false;

Vue.use(iView);
Vue.prototype.$bus = bus;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
