/*
 * Animated background that creates a prime wheel.
 * Uses a cookie to track activity status across multiple pages.
 * This will likely not run on mobile browsers due to the timer routine.
 *
 * Filename:  prime_wheel.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  032221
 * 
 * Copyright (c) 2020-2021 Matthew Evans
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

/*
 * Prime Wheel class
 * This stores variables used to generate and draw the wheel
 * Also contains members for setting the draw offset and resetting the wheel
 */
class prime_wheel {
    /*
     * Config variables
     */
    /* Sets the background color */
    BACKGROUND_COLOR = "#808080";
    /* Sets the font color */
    FONT_COLOR = "#191970";
    /* Sets the font size */
    FONT_SIZE = "32px";
    /* Sets the font face */
    FONT_FACE = "Arial";
    /* Set the scale factor for the wheel */
    SCALE = 4;
    /* Timer interval to draw (milliseconds) */
    INTERVAL = 5;
    /* ID of canvas to draw to */
    CANVAS_NAME = "background_canvas"
    /* Use random offset */
    USE_RANDOM_OFFSET = true;
    /* Spam console with prime numbers */
    SPAM = true;

    /*
     * Initialize
     */
    constructor() {
        this.canvas = document.getElementById(this.CANVAS_NAME);
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = this.canvas.clientWidth * this.SCALE;
        this.canvas.height = this.canvas.clientHeight * this.SCALE;

        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.center_x = this.width / 2;
        this.center_y = this.height / 2;

        this.last_prime = 2;

        this.x_offset = 0;
        this.y_offset = 0;
        this.set_offset();
        this.animate_proc = null;

        //  Clear the canvas
        this.ctx.fillStyle = this.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /*
     * Generate a random x,y offset for drawing the wheel
     */
    set_offset() {
        this.x_offset = Math.floor(Math.random() * (this.center_x * 2 / 3) + 1);
        this.x_offset = this.x_offset * (Math.random() < 0.5 ? -1 : 1);
        this.y_offset = Math.floor(Math.random() * (this.center_y * 2 / 3) + 1);
        this.y_offset = this.y_offset * (Math.random() < 0.5 ? -1 : 1);
    }

    /*
     * Resets the effect
     */
    reset() {
        this.ctx.fillStyle = this.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.last_prime = 2;
    }
}

/*
 * Function to check if a number is prime
 */
function is_prime(num) {
    for(var i = 2; i < num; i++) {
        if(num % i == 0) return false;
    }
    return true;
}

/*
 * Animation function
 */
function prime_wheel_animate(the_wheel) {
    //  Prime number found, draw it using cartesian coordinates
    if(is_prime(the_wheel.last_prime)) {
        if(the_wheel.SPAM) console.log("Found prime: " + the_wheel.last_prime);
        the_wheel.ctx.font = the_wheel.FONT_SIZE + " " + the_wheel.FONT_FACE;
        the_wheel.ctx.fillStyle = the_wheel.FONT_COLOR;
        the_wheel.ctx.fillText(
            the_wheel.last_prime,
            (the_wheel.center_x + the_wheel.x_offset) + (the_wheel.last_prime * Math.cos(the_wheel.last_prime)),
            (the_wheel.center_y + the_wheel.y_offset) - (the_wheel.last_prime * Math.sin(the_wheel.last_prime))
        );
    }

    the_wheel.last_prime++;  //  Increment counter to check for next prime

    //  Once the wheel reaches (1400 * SCALE) then reset
    if(the_wheel.last_prime > 1400 * the_wheel.SCALE) {
        console.log("Resetting prime wheel effect");
        //  Change offset if enabled
        if(the_wheel.USE_RANDOM_OFFSET) the_wheel.set_offset();
        the_wheel.reset();
    }
}

/*
 * Function to toggle background on/off
 */
function prime_wheel_toggle(the_wheel) {
    var x = document.getElementById(the_wheel.CANVAS_NAME);
    if (x.style.display === "none") {
        //  If off turn on
        prime_wheel_set_cookie("true");
        x.style.display = "block";
        the_wheel.animate_proc = setInterval(function() { prime_wheel_animate(the_wheel) }, the_wheel.INTERVAL);
        console.log("Prime wheel toggeled on");
    } else {
        //  Otherwise turn off
        prime_wheel_set_cookie("false");
        x.style.display = "none";
        clearInterval(the_wheel.animate_proc);
        console.log("Prime wheel toggeled off");
    }
}

/*
 * Function to register the prime wheel cookie
 * Creates cookie on page load if one does not already exist
 */
function prime_wheel_reg_cookie(cookie_value) {
    if(document.cookie.search("prime_wheel_running=") == -1) {
        prime_wheel_set_cookie(cookie_value);
    }
}
document.onload = prime_wheel_reg_cookie("true");  //  Register automatically on page load

/*
 * Function to set the prime wheel cookie - expires after 24hrs
 */
function prime_wheel_set_cookie(cookie_value) {
    document.cookie = `prime_wheel_running=${cookie_value}; SameSite=Strict; Max-Age=86400; Path=/`;
}

/*
 * Function to check prime_wheel_running cookie value
 * Return true if set to true, false if set to false or not set
 */
function prime_wheel_get_cookie() {
    if(document.cookie.search("prime_wheel_running=") == -1) return false;
    if(document.cookie.search("prime_wheel_running=true") == -1) return false;
    return true;
}

/*
 * Function to start up the prime wheel
 */
function prime_wheel_start(the_wheel) {
    if(prime_wheel_get_cookie()) {
        the_wheel.animate_proc = setInterval(function() { prime_wheel_animate(the_wheel) }, the_wheel.INTERVAL);
        console.log("Running prime wheel effect");
    } else {
        var x = document.getElementById(the_wheel.CANVAS_NAME);
        x.style.display = "none";
    }
}

/*
 * Usage:
 *
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
 * <head>
 *    <script type="text/javascript" src="prime_wheel.js"></script>
 * </head>
 * <body>
 *    <canvas id="background_canvas"></canvas>
 *    <script type="text/javascript">
 *       let the_wheel = new prime_wheel();
 *       prime_wheel_start(the_wheel);
 *    </script>
 * </body>
 * 
 * <button onclick="prime_wheel_toggle(the_wheel)">Toggle Background</button>
 */
