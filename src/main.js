import 'regenerator-runtime/runtime.js'
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import WebTerm from './WebTerm'

import cmdProcessor from './modules/TermCommands.mjs'
import { PostRenderer } from './modules/PostRenderer.mjs'
cmdProcessor.addModule(new PostRenderer())

Vue.use(AsyncComputed)
Vue.component('WebTerm', WebTerm)

new Vue({
  el: '#app'
})
