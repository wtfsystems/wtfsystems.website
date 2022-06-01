/*
 * Takes an array of UTF-16 codes and draws it to a canvas as text.
 * Useful to obfuscate email addresses from most crawlers.
 *
 * Filename:  encodedMessage.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  060122
 *
 * Copyright (c) 2020-2022 Matthew Evans - See LICENSE.md
 *
 */

const encodedMessage = (ENCODED_TEXT, options) => {
    const options = options || {}

    const canvas = document.getElementById(options.canvas_name || "message_canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = options.canvas_width || 200
    canvas.height = options.canvas_height || 32

    ctx.fillStyle = options.backgrounnd_color || "#808080"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.font = (options.font_size || "16px") + " " + (options.font_face || "Arial")
    ctx.fillStyle = options.font_color || "#191970"
    ctx.textBaseline = options.text_baseline || "middle"
    ctx.textAlign = options.text_align || "center" 

    const locX = options.loc_x || (ctx.canvas.width / 2)
    const locY = options.loc_y || (ctx.canvas.height / 2)

    ctx.fillText(String.fromCharCode(...ENCODED_TEXT), locX, locY)
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
 *       )
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
 * text_baseline - Vertical alignment of text (default middle)
 * text_align - Horizontal alignment of text (default center)
 * loc_x - X location of text (default center of canvas)
 * loc_y - Y location of text (default center of canvas)
 */
