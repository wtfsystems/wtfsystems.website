/*
 * Takes an array of UTF-16 codes and draws it to a canvas as text.
 * Useful to obfuscate email addresses from most crawlers.
 *
 * Filename:  encoded_message.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  110320
 * 
 * See LICENSE.md for copyright information.
 * 
 * Copyright (c) 2020 Matthew Evans
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

class encoded_message {
    /* Sets the background color */
    BACKGROUND_COLOR = "#808080";
    /* Sets the font color */
    FONT_COLOR = "#191970";
    /* Sets the font size */
    FONT_SIZE = "16px";
    /* Sets the font face */
    FONT_FACE = "Arial";
    /* ID of canvas to draw to */
    CANVAS_NAME = "message_canvas"
    /* Text to draw as an array of UTF-16 codes */
    ENCODED_TEXT = [ 0x63, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x40, 0x77, 0x74, 0x66, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x73, 0x2e, 0x6e, 0x65, 0x74 ]

    constructor() {
        var canvas = document.getElementById(this.CANVAS_NAME);
        var ctx = canvas.getContext("2d");

        canvas.width = 180;
        canvas.height = 24;

        ctx.fillStyle = this.BACKGROUND_COLOR;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.font = this.FONT_SIZE + " " + this.FONT_FACE;
        ctx.fillStyle = this.FONT_COLOR;
        ctx.textBaseline = 'middle'; 
        ctx.textAlign = 'center'; 

        var output_text = String.fromCharCode(...this.ENCODED_TEXT);

        ctx.fillText(output_text, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
}

let the_message = new encoded_message();
