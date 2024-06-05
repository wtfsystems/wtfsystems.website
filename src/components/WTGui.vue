<!--
  wtfsystems website
  Copyright (c) 2024-present Matthew Evans - See LICENSE.md
-->

<script setup lang="ts">

const links = [
  {
    title: 'NPM:',
    url: 'https://www.npmjs.com/package/@wtfsystems/wtgui'
  },
  {
    title: 'Source repository:',
    url: 'https://github.com/wtfsystems/wtgui'
  },
  {
    title: 'Example:',
    url: 'https://github.com/wtfsystems/wtgui_example'
  },
  {
    title: 'Documentation:',
    url: 'https://www.wtfsystems.net/docs/wtgui/'
  }
]

</script>

<template>
  <div>
    <a href="https://github.com/wtfsystems/wtgui">
      <img src="/src/assets/wtgui-logo.png">
    </a>
    <h3>Experimental HTML5 Canvas Menu System</h3>
    <ul v-for="item in links">
      <li>{{ item.title }} <a :href="item.url">{{ item.url }}</a></li>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
img
  height 32px
</style>
