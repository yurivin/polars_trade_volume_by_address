import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import BootstrapVue from "bootstrap-vue"
import router from "./router";
import store from './store/statistics'


Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.component('modal', {
  template: `
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box"><slot></slot></div>
      </div>
      <button class="modal-close" @click="$emit('close')"></button>
    </div>
  `
});


new Vue({
  el: '#app',
  data: {
    showModal: false
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')

