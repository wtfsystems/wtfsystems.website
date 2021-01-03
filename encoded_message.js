/*
 * Takes an array of UTF-16 codes and draws it to a canvas as text.
 * Useful to obfuscate email addresses from most crawlers.
 *
 * Filename:  encoded_message.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  110820
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

    var canvas = document.getElementById(options.canvas_name || "message_canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = options.canvas_width || 200;
    canvas.height = options.canvas_height || 32;

    ctx.fillStyle = options.backgrounnd_color || "#808080";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.font = (options.font_size || "16px") + " " + (options.font_face || "Arial");
    ctx.fillStyle = options.font_color || "#191970";
    ctx.textBaseline = options.text_baseline || "middle"; 
    ctx.textAlign = options.text_align || "center"; 

    /* Draw the encoded text */
    ctx.fillText(String.fromCharCode(...ENCODED_TEXT), ctx.canvas.width / 2, ctx.canvas.height / 2);
}

/*
 * HTML:
 * <head>
 *    <script type="text/javascript" src="encoded_message.js"></script>
 * </head>
 * <body>
 *    <canvas id="message_canvas"></canvas>
 *    <script type="text/javascript">
 *       encoded_message(
 *          [ 0x63, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x40, 0x77, 0x74, 0x66, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x73, 0x2e, 0x6e, 0x65, 0x74 ],
 *          { canvas_width: 240, canvas_height: 48 }
 *       );
 *    </script>
 * </body>
 *
 * Required Parameter:
 * ENCODED_TEXT - An array of UTF-16 codes
 *
 * Optional Parameters:
 * canvas_name - Set the ID of the canvas to draw to
 * canvas_width - Set the width of the canvas
 * canvas_height - Set the height of the canvas
 * backgrounnd_color - Set the canvas background color
 * font_color - Set the font color
 * font_size - Set the font size
 * font_face - Set the font face
 * text_baseline - Vertical alignment of text
 * text_align - Horizontal alignment of text
 */
