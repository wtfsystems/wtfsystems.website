<!--
    Web Terminal Interface

    Filename:  WebTermDisplay.vue
    By:  Matthew Evans
    See LICENSE.md for copyright information.
-->

<template>
    <div class="term-display">
        <div v-html="display"></div>
        <div>&nbsp;</div>
    </div>
</template>

<script>
export default {
    name: 'WebTermDisplay',
    props: {
        display: String     //  HTML output
    }
}
</script>

<style lang="scss" scoped>

.term-display {
    display: flex;
    flex-direction: column;
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
}

.term-display::v-deep {
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
}

</style>
