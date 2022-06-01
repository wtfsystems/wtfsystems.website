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