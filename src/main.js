import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueResource from 'vue-resource'
import lrz from "lrz"
import $ from 'jquery'

Vue.use(VueResource);
new Vue({
  el: '#app',
  render: h => h(App)
})
