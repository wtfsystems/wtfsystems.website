/*
 * Animated background that creates a prime wheel
 *
 * Filename:  prime_wheel.js
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
        console.log("Running prime wheel effect");

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
     * Generate a random offset if enabled
     */
    set_offset() {
        if(this.USE_RANDOM_OFFSET) {
            this.x_offset = Math.floor(Math.random() * (this.center_x * 2 / 3) + 1);
            this.x_offset = this.x_offset * (Math.random() < 0.5 ? -1 : 1);
            this.y_offset = Math.floor(Math.random() * (this.center_y * 2 / 3) + 1);
            this.y_offset = this.y_offset * (Math.random() < 0.5 ? -1 : 1);
        }
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
function animate_wheel(self) {
    if(is_prime(self.last_prime)) {
        if(self.SPAM) console.log("Found prime: " + self.last_prime);
        self.ctx.font = self.FONT_SIZE + " " + self.FONT_FACE;
        self.ctx.fillStyle = self.FONT_COLOR;
        self.ctx.fillText(
            self.last_prime,
            (self.center_x + self.x_offset) + (self.last_prime * Math.cos(self.last_prime)),
            (self.center_y + self.y_offset) - (self.last_prime * Math.sin(self.last_prime))
        );
    }

    self.last_prime++;

    //  Resets the effect
    if(self.last_prime > 1400 * self.SCALE) {
        console.log("Resetting prime wheel effect");
        self.set_offset();
        self.ctx.fillStyle = self.BACKGROUND_COLOR;
        self.ctx.fillRect(0, 0, self.width, self.height);
        self.last_prime = 2;
    }
}

/*
 * Function to toggle background on/off
 * Usage:  <button onclick="toggle_background(the_wheel)">Toggle Background</button>
 */
function toggle_background(self) {
    var x = document.getElementById(self.CANVAS_NAME);
    if (x.style.display === "none") {
        console.log("Prime wheel toggeled on");
        x.style.display = "block";
        self.animate_proc = setInterval(function() { animate_wheel(self) }, self.INTERVAL);
    } else {
        console.log("Prime wheel toggeled off");
        x.style.display = "none";
        clearInterval(self.animate_proc);
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
 * <head>
 *    <script type="text/javascript" src="prime_wheel.js"></script>
 * </head>
 * <body>
 *    <canvas id="background_canvas"></canvas>
 *    <script type="text/javascript">
 *       let the_wheel = new prime_wheel();
 *       the_wheel.animate_proc = setInterval(function() { animate_wheel(the_wheel) }, the_wheel.INTERVAL);
 *    </script>
 * </body>
 */
