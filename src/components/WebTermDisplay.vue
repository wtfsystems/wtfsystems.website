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
@import '../css/WebTerm.scss';

.term-display {
    display: flex;
    flex-direction: column;
}

.term-display::v-deep {
    font-family: $term_font_family;
    font-size: $term_font_size;
}

.term-display::v-deep a:link {
    color: $link_color;
    text-decoration: underline dotted;
}
.term-display::v-deep a:visited {
    color: $link_visited;
    text-decoration: underline dotted;
}
.term-display::v-deep a:hover {
    color: $link_hover;
    text-decoration: underline dotted;
}
.term-display::v-deep a:active {
    color: $link_active;
    text-decoration: underline dotted;
}
</style>
