<!--
  wtfsystems website
  Copyright (c) 2024-present Matthew Evans - See LICENSE.md
-->

<script setup lang="ts">

import SiteHeader from './components/SiteHeader.vue'
import WTEngine from './components/WTEngine.vue'
import WTGui from './components/WTGui.vue'
import SiteFooter from './components/SiteFooter.vue'

</script>

<template>
  <SiteHeader/>
  <section>
    <WTEngine/>
    <hr/>
    <WTGui/>
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
hr
  border 1px solid rgba(220, 220, 220, 0.75)
  width 98%
</style>
