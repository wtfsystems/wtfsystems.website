<!--
    Commentblock
-->

<template>
    <div class="term-output">
        <template v-for="item in outputHistory">
            <WebTermHistory :key="item.history" v-bind:history="item.history"></WebTermHistory>
            <WebTermDisplay :key="item.display" v-bind:display="item.display"></WebTermDisplay>
        </template>
    </div>
</template>

<script>
import WebTermHistory from './WebTermHistory'
import WebTermDisplay from './WebTermDisplay'

export default {
    name: 'WebTermOutput',
    components: {
        WebTermHistory,
        WebTermDisplay
    },
    props: {
        output: {
            history: String,    //  Receive command history
            display: String     //  Receive display HTML
        }
    },
    data() {
        return {
            outputHistory: []   //  Array to store each output display
        }
    },
    watch: {
        //  Wait for display data and add to the history array
        output: function(newValue) {
            if(newValue.display === "clear") {
                this.outputHistory = []
                return
            }
            this.outputHistory.push(newValue)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../css/WebTerm.scss';

.term-output {
    color: $term_fg_color;
    background: $term_bg_color;
}
</style>
