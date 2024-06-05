<!--
  wtfsystems website
  Copyright (c) 2024-present Matthew Evans - See LICENSE.md
-->

<script setup lang="ts">

const links = [
  {
    title: 'Source repository:',
    url: 'https://github.com/wtfsystems/wtengine'
  },
  {
    title: 'Example:',
    url: 'https://github.com/wtfsystems/wte_demo_01'
  },
  {
    title: 'Documentation:',
    url: 'https://www.wtfsystems.net/docs/wtengine/index.html'
  }
]

</script>

<template>
  <div>
    <a href="https://github.com/wtfsystems/wtengine">
      <img src="/src/assets/wte-logo.png">
    </a>
    <h3>C++17 Game Engine</h3>
    <ul v-for="item in links">
      <li>{{ item.title }} <a :href="item.url">{{ item.url }}</a></li>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
img
  height 34px
</style>
