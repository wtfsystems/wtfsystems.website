/*
 * Animated background that creates a prime wheel
 *
 * Filename:  prime_wheel.js
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

console.log("Running prime wheel effect");
/*
 * Config variables
 */
/* Sets the background color */
var BACKGROUND_COLOR = "#808080";
/* Sets the font color */
var FONT_COLOR = "#191970";
/* Sets the font size */
var FONT_SIZE = "32px";
/* Sets the font face */
var FONT_FACE = "Arial";
/* Set the scale factor for the wheel */
var SCALE = 4;
/* Timer interval to draw (milliseconds) */
var INTERVAL = 5;
/* ID of canvas to draw to */
var CANVAS_NAME = "background_canvas"
/* Use random offset */
var USE_OFFSET = true;
/* Spam console with prime numbers */
var SPAM = true;

/*
 * Initialize
 */
var canvas = document.getElementById(CANVAS_NAME);
var ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth * SCALE;
canvas.height = canvas.clientHeight * SCALE;

var width = ctx.canvas.width;
var height = ctx.canvas.height;

var center_x = width / 2;
var center_y = height / 2;

var last_prime = 2;

var x_offset = 0;
var y_offset = 0;

/*
 * Function to generate a random offset
 */
function set_offset() {
    if(USE_OFFSET) {
        x_offset = Math.floor(Math.random() * (center_x * 2 / 3) + 1);
        x_offset = x_offset * (Math.random() < 0.5 ? -1 : 1);
        y_offset = Math.floor(Math.random() * (center_y * 2 / 3) + 1);
        y_offset = y_offset * (Math.random() < 0.5 ? -1 : 1);
    }
}
set_offset();  //  Call to set

/*
 * Function to find prime numbers
 */
function find_prime(num) {
    for(var i = 2; i < num; i++) {
        if(num % i == 0) return false;
    }
    return true;
}

/*
 * Animation function
 */
function animate() {
    if(find_prime(last_prime)) {
        if(SPAM) console.log("Found prime: " + last_prime);
        ctx.font = FONT_SIZE + " " + FONT_FACE;
        ctx.fillStyle = FONT_COLOR;
        ctx.fillText(
            last_prime,
            (center_x + x_offset) + (last_prime * Math.cos(last_prime)),
            (center_y + y_offset) - (last_prime * Math.sin(last_prime))
        );
    }

    last_prime++;

    /*
     * Resets the effect
     */
    if(last_prime > 1400 * SCALE) {
        console.log("Resetting prime wheel effect");
        set_offset();
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, width, height);
        last_prime = 2;
    }
}

/*
 * Clear the canvas and start the animation
 */
ctx.fillStyle = BACKGROUND_COLOR;
ctx.fillRect(0, 0, width, height);

var animate_proc = setInterval(animate, INTERVAL);

/*
 * Function to toggle background on/off
 */
function toggle_background() {
    var x = document.getElementById(CANVAS_NAME);
    if (x.style.display === "none") {
        console.log("Prime wheel toggeled on");
        x.style.display = "block";
        animate_proc = setInterval(animate, INTERVAL);
    } else {
        console.log("Prime wheel toggeled off");
        x.style.display = "none";
        clearInterval(animate_proc);
    }
}

/*
 * CSS:
 * html {
 *     height: 100%;
 * }
 * #background_canvas {
 *     position: fixed;
 *     display: block;
 *     width: 100%;
 *     height: 100%;
 *     margin: 0 auto;
 * }
 * 
 * HTML:
 * <canvas id="background_canvas"></canvas>
 * <script src="prime_wheel.js"></script>
 */
