/*
 * Web Terminal Interface
 *
 * Filename:  main.js
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Main file to set stuff up.
 */

/*
 * Import necessary libraries.
 */
import 'regenerator-runtime/runtime.js'
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'

/*
 * Set up the command processor and its modules.
 */
import cmdProcessor from './modules/TermCommands.mjs'
import { PostRenderer } from './modules/PostRenderer.mjs'
import { PrimeWheel } from './modules/PrimeWheel.mjs'

cmdProcessor.addModule(new PostRenderer('api/posts.json'))
cmdProcessor.addModule(new PrimeWheel())

cmdProcessor.getModule('posts').getPosts()

/*
 * Set up the Vue app.
 */
import WebTerm from './WebTerm'

Vue.use(AsyncComputed)
Vue.component('WebTerm', WebTerm)

new Vue({
  el: '#app'
})
