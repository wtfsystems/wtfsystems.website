<!--
    Web Terminal Interface

    Filename:  WebTermHistory.vue
    By:  Matthew Evans
    See LICENSE.md for copyright information.
-->

<template>
    <div class="term-history" v-if="history">
         <WebTermInfo v-bind:userip="userip"></WebTermInfo>
         <span><span class="prompt">$</span> {{ history }}</span>
         <span><br/></span>
    </div>
</template>

<script>
import WebTermInfo from './WebTermInfo'

export default {
    name: 'WebTermHistory',
    components: {
        WebTermInfo
    },
    props: {
        history: String,     //  Previously ran command
        userip: String       //  User's IP address
    }
}
</script>

<style lang="scss" scoped>
@import '../css/WebTerm.scss';

.term-history {
    display: flex;
    flex-direction: column;
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
}

.prompt {
    display: inline;
    color: $term_cr_color;
}
</style>
