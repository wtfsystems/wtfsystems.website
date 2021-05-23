/*
 * Web Terminal Interface
 *
 * Filename:  SetColor.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Command for setting the terminal colors.
 */

import { Command } from './Command.mjs'

export class SetColor extends Command {
    /*
     * Initialize SetColor.
     */
    constructor() {
        super()

        this.defaultBgColor = document.body.style.backgroundColor
        this.defaultFgColor = document.body.style.color

        this.loadColors()
    }

    /*
     * Process command.
     */
    exec(args) {
        var errMsg = "See <span style=\"font-weight: bold;\">setcolor help</span> for more info."
        if(String(args[0]).toLowerCase() === "help") {
            return this.render.help()
        }
        if(String(args[0]).toLowerCase() === "reset") {
            this.setBgColor(this.defaultBgColor)
            this.setFontColor(this.defaultFgColor)
            return "Colors reset to default."
        }
        if(String(args[0]).toLowerCase() === "save") {
            if (this.saveColors()) return "Color settings saved."
            return "Error saving color settings!"
        }
        if(String(args[0]).toLowerCase() === "load") {
            if(this.loadColors()) return "Color settings loaded."
            return "Error loading color settings!"
        }
        if(String(args[0]).toLowerCase() === "background") {
            if((args[1] !== undefined) && (this.testHex(args[1]) || this.testRgb(args[1]))) {
                this.setBgColor(args[1])
                return "Background color set."
            }
            return "Incorrect color code. " + errMsg
        }
        if(String(args[0]).toLowerCase() === "font") {
            if(this.testHex(args[1]) || this.testRgb(args[1])) {
                this.setFontColor(args[1])
                return "Font color set."
            }
            return "Incorrect color code. " + errMsg
        }
        return "Incorrect usage. " + errMsg
    }

    /*
     * Test a string for valid hex format
     */
    testHex(str) {
        return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(str)
    }

    /*
     * Test a string for valid rgb format
     */
    testRgb(str) {
        return /^(rgb|hsl)?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)$/i.test(str)
    }

    /*
     * Set the background color
     */
    setBgColor(color) {
        document.body.style.backgroundColor = color
    }

    /*
     * Set the font color
     */
    setFontColor(color) {
        document.body.style.color = color
    }

    /*
     * Check if color settings exist locally
     */
    settingsExist() {
        if(localStorage.getItem("bgcolor") === null) return false
        if(localStorage.getItem("fgcolor") === null) return false
        return true
    }

    /*
     * Save color settings to localstore
     */
    saveColors() {
        localStorage.setItem("bgcolor", document.body.style.backgroundColor)
        localStorage.setItem("fgcolor", document.body.style.color)
        if(this.settingsExist()) return true
        return false
    }

    /*
     * Load color settings from localstore
     */
    loadColors() {
        if(this.settingsExist()) {
            document.body.style.backgroundColor = localStorage.getItem("bgcolor")
            document.body.style.color = localStorage.getItem("fgcolor")
            return true
        }
        return false
    }

    /*
     * Render functions.
     */
    render = {
        help() {
            return `
            Usage: setcolor background [color]|font [color]|save|load|reset
            <br/><br/>
            <table>
            <tr><td><span style=\"font-weight: bold;\">save:</span></td><td>Save settings.  This will load on next visit.</td><tr/>
            <tr><td><span style=\"font-weight: bold;\">load:</span></td><td>Load settings manually.</td><tr/>
            <tr><td><span style=\"font-weight: bold;\">reset:</span></td><td>Reset colors to the default values.</td><tr/>
            <tr><td><span style=\"font-weight: bold;\">background:</span></td><td>Set the background color.</td><tr/>
            <tr><td><span style=\"font-weight: bold;\">font:</span></td><td>Set the font color.</td><tr/>
            <tr><td colspan=\"2\">
            Colors must be passed as: hex #nnnnnn or rgb(n,n,n) or hsl(n,n,n)
            <br/>
            Example: <span style=\"font-weight: bold;\">setcolor font #ffffff</span>
            </td></tr></table>
            `
        }
    }

    /*
     * SetColor parameters.
     */
    command = "setcolor"
    description = "Set terminal colors"
}
