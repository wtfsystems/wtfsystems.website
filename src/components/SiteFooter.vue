<!--
  wtfsystems website
  Copyright (c) 2024-present Matthew Evans - See LICENSE.md
-->

<script setup lang="ts">
import { ref } from 'vue'

const showLicense = ref(false)

const licenseStr = `
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
<br/><br/>
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
<br/><br/>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.<br/>`

const toggleShow = () => {
  showLicense.value = !showLicense.value
  return false
}
</script>

<template>
  <footer>
    <div class="title">
      Copyright &#169; 2024-present
      <a href="https://github.com/AtomicSponge">
        Matthew Evans
        <img src="/src/assets/github-mark-white.png" class="github"/>
      </a>
    </div>
    <span v-show="showLicense" v-html="licenseStr"></span>
    <div>
      Licenced under the
      <a href="#" @mouseover="showLicense=true" @mouseleave="showLicense=false" @click="toggleShow">
        MIT licence
      </a>
    </div>
    <div>
      All images are licensed by
      <a href="https://creativecommons.org/licenses/by/4.0/">
        CC BY 4.0
      </a>
    </div>
  </footer>
</template>

<style scoped>
.title {
  font-weight: bold;
}
.github {
  width: 8px;
  height: 8px;
}
footer {
  text-align: right;
  font-size: x-small;
  line-height: 1.5;
  margin-bottom: 8px;
}
</style>
