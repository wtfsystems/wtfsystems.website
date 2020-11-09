/*
 * Takes an array of UTF-16 codes and draws it to a canvas as text.
 * Useful to obfuscate email addresses from most crawlers.
 *
 * Filename:  encoded_message.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  110820
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

function encoded_message(ENCODED_TEXT, options) {
    var options = options || {};
    /* Sets the background color */
    var BACKGROUND_COLOR = options.backgrounnd_color || "#808080";
    /* Sets the font size */
    var FONT_SIZE = options.font_size || "16px";
    /* Sets the font face */
    var FONT_FACE = options.font_face || "Arial";
    /* ID of canvas to draw to */
    var CANVAS_NAME = options.canvas_name || "message_canvas";

    var canvas = document.getElementById(CANVAS_NAME);
    var ctx = canvas.getContext("2d");

    /* Set canvas width and height */
    canvas.width = options.canvas_width || 200;
    canvas.height = options.canvas_height || 32;

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.font = FONT_SIZE + " " + FONT_FACE;
    ctx.fillStyle = options.font_color || "#191970";
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 

    /* Draw the encoded text */
    ctx.fillText(String.fromCharCode(...ENCODED_TEXT), ctx.canvas.width / 2, ctx.canvas.height / 2);
}
