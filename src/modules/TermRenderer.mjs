/*
 * Web Terminal Interface
 *
 * Filename:  TermRenderer.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Renderer canvas for commands to draw to.
 * WIP
 */

class TermRenderer {

    canvas_name = "termrenderer_canvas"

    /*
     * Set up the TermRenderer
     */
    constructor() {
        //  Append canvas css styling
        let style = document.createElement("style")
        style.innerHTML = `
            #${this.canvas_name} {
                pointer-events: none;
                position: fixed;
                display: block;
                background-color: rgba(0, 0, 0, 0);
                width: 100%;
                height: 100%;
                margin: 0 auto;
            }`
        document.body.appendChild(style)

        //  Prepend canvas html
        let canvas = document.createElement("canvas")
        canvas.setAttribute("id", this.canvas_name)
        canvas.setAttribute("width", window.innerWidth)
        canvas.setAttribute("height", window.innerHeight)
        document.body.prepend(canvas)

        this.getCanvas = () => { return document.getElementById(this.canvas_name) }
        this.getRenderer = () => { return this.getCanvas().getContext("2d") }
        this.getWidth = () => { return this.getCanvas().width }
        this.getHeight = () => { return this.getCanvas().height }

        this.resizeToWindow()
    }

    /*
     * Resize the renderer to fit the window
     */
    resizeToWindow() {
        //this.getCanvas().width = window.innerWidth
        //this.getCanvas().height = window.innerHeight
    }
}

export default new TermRenderer()
