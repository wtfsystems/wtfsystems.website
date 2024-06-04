<!--
  wtfsystems website
  Copyright (c) 2024-present Matthew Evans - See LICENSE.md
-->

<script setup lang="ts">

import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

</script>

<template>
  <SiteHeader/>
  <section>
    <div>
      <a href="https://github.com/wtfsystems/wtengine">
        <img src="/src/assets/wte-logo.png">
      </a>
      <h3>C++17 Game Engine</h3>
      <ul>
        <li>
          Source repository:
          <a href="https://github.com/wtfsystems/wtengine">
            https://github.com/wtfsystems/wtengine
          </a>
        </li>
        <li>
          Example:
          <a href="https://github.com/wtfsystems/wte_demo_01">
            https://github.com/wtfsystems/wte_demo_01
          </a>
        </li>
        <li>
          Documentation:
          <a href="https://www.wtfsystems.net/docs/wtengine/index.html">
            https://www.wtfsystems.net/docs/wtengine/index.html
          </a>
        </li>
      </ul>
    </div>
    <hr/>
    <div>
      <a href="https://github.com/wtfsystems/wtgui">
        <img src="/src/assets/wtgui-logo.png">
      </a>
      <h3>Experimental HTML5 Canvas Menu System</h3>
      <ul>
        <li>
          NPM:
          <a href="https://www.npmjs.com/package/@wtfsystems/wtgui">
            https://www.npmjs.com/package/@wtfsystems/wtgui
          </a>
        </li>
        <li>
          Source repository:
          <a href="https://github.com/wtfsystems/wtgui">
            https://github.com/wtfsystems/wtgui
          </a>
        </li>
        <li>
          Example:
          <a href="https://github.com/wtfsystems/wtgui_example">
            https://github.com/wtfsystems/wtgui_example
          </a>
        </li>
        <li>
          Documentation:
          <a href="https://www.wtfsystems.net/docs/wtgui/">
            https://www.wtfsystems.net/docs/wtgui/
          </a>
        </li>
      </ul>
    </div>
  </section>
  <SiteFooter/>
</template>

<style lang="stylus" scoped>
section  //  main body
  flex auto
  overflow auto
  text-align left
  margin-top 12px
  margin-bottom 4px
  padding-top 8px
  padding-bottom 8px
img
  height 32px
hr
  border 1px solid rgba(220, 220, 220, 0.75)
  width 98%
</style>
