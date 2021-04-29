import 'regenerator-runtime/runtime.js'
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import WebTerm from './WebTerm'

Vue.use(AsyncComputed)
Vue.component('WebTerm', WebTerm)

new Vue({
  el: '#app'
})
