<!--
    Commentblock
-->

<template>
    <div id="term-window">
        <WebTermOutput v-bind:output="output"></WebTermOutput>
        <WebTermInput @user-input="processInput"></WebTermInput>
        <span ref="bottom"></span>
    </div>
</template>

<script>
import WebTermOutput from './components/WebTermOutput'
import WebTermInput from './components/WebTermInput'
import { TermCommands } from './modules/TermCommands.mjs'

//  Object to process terminal input
let cmdProcessor = new TermCommands()

export default {
    name: 'WebTerm',
    components: {
        WebTermOutput,
        WebTermInput
    },
    data() {
        return {
            output: {
                //  Data to send to Output component's props
                history: String,    //  Store command input
                display: String     //  Store HTML output
            }
        }
    },
    methods: {
        //  Get data from input component
        processInput(inData) {
            let data = new Object()
            var displayData = this.resolveCommand(inData)
            data.history = inData
            data.display = displayData
            this.output = data
            this.$nextTick(() => { this.$refs.bottom.scrollIntoView() })
        },

        //  Process the received command
        resolveCommand(cmd) {
            cmd = cmd.split(" ")
            if(String(cmd[0]).toLowerCase() === "clear") return "clear"  //  Special case for clearing console
            return cmdProcessor.processCommand(cmd)
        }
    },
    //  Display on page load
    mounted: function() {
        let data = new Object()
        data.history = null
        data.display = cmdProcessor.processCommand(["motd"])
        this.output = data
    }
}
</script>

<style lang="scss" scoped>
@import './css/WebTerm.scss';

#term-window {
    color: $term_fg_color;
    background: $term_bg_color;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    padding: 6px;
}
</style>
