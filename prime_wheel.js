/*
 * Animated background that creates a prime wheel
 *
 * Filename:  prime_wheel.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  100720
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
var background_color = "#808080";
/* Sets the font color */
var font_color = "#191970";
/* Sets the font size */
var font_size = "32px";
/* Sets the font face */
var font_face = "Arial";
/* Set the scale factor for the wheel */
var scale = 4;
/* Timer interval to draw (milliseconds) */
var interval = 10;
/* ID of canvas to draw to */
var canvas_name = "background_canvas"

/*
 * Initialize
 */
var canvas = document.getElementById(canvas_name);
var ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth * scale;
canvas.height = canvas.clientHeight * scale;

var width = ctx.canvas.width;
var height = ctx.canvas.height;

var center_x = width / 2;
var center_y = height / 2;

var last_prime = 2;

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
        console.log("Found prime: " + last_prime);
        ctx.font = font_size + " " + font_face;
        ctx.fillStyle = font_color;
        ctx.fillText(
            last_prime,
            center_x + (last_prime * Math.cos(last_prime)),
            center_y - (last_prime * Math.sin(last_prime))
        );
    }

    last_prime++;

    /*
     * Resets the effect
     */
    if(last_prime > 1200 * scale) {
        console.log("Resetting prime wheel effect");
        ctx.fillStyle = background_color;
        ctx.fillRect(0, 0, width, height);
        last_prime = 2;
    }
}

/*
 * Clear the canvas and start the animation
 */
ctx.fillStyle = background_color;
ctx.fillRect(0, 0, width, height);

var animate_proc = setInterval(animate, interval);

/*
 * Function to toggle background on/off
 */
function toggle_background() {
    var x = document.getElementById(canvas_name);
    if (x.style.display === "none") {
        console.log("Prime wheel toggeled on");
        x.style.display = "block";
        animate_proc = setInterval(animate, interval);
    } else{
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
