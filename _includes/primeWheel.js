/*
 * Animated background that creates a prime wheel.
 * Uses a cookie to track activity status across multiple page visits.
 *
 * Filename:  primeWheel.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  060322
 *
 * Copyright (c) 2020-2022 Matthew Evans - See LICENSE.md
 *
 */

/*
 * Prime Wheel class
 */
class primeWheel {
    /*
     * Config variables
     */
    static BACKGROUND_COLOR = "#000000"       //  Background color
    static FONT_COLOR = "#0000FF"             //  Font color
    static FONT_SIZE = "32px"                 //  Font size
    static FONT_FACE = "Arial"                //  Font face
    static SCALE = 4                          //  Scale multiplier
    static INTERVAL = 5                       //  Speed interval
    static CANVAS_NAME = "primewheel_canvas"  //  Target draw canvas
    static USE_RANDOM_OFFSET = true           //  Offset center position
    static SPAM = false                       //  Spam the console with prime numbers

    /*
     * Internal variables
     */
    static #vars = {
        canvas: null,
        ctx: null,
        width: null,
        height: null,
        center_x: null,
        center_y: null,
        last_prime: null,
        x_offset: null,
        y_offset: null,
        animate_proc: null
    }

    /*
     * Initialize
     */
    static {
        this.#vars.canvas = document.getElementById(this.CANVAS_NAME)
        this.#vars.ctx = this.#vars.canvas.getContext("2d")

        this.#vars.canvas.width = this.#vars.canvas.clientWidth * this.SCALE
        this.#vars.canvas.height = this.#vars.canvas.clientHeight * this.SCALE

        this.#vars.width = this.#vars.ctx.canvas.width
        this.#vars.height = this.#vars.ctx.canvas.height

        this.#vars.center_x = this.#vars.width / 2
        this.#vars.center_y = this.#vars.height / 2

        this.#vars.last_prime = 2

        if(this.USE_RANDOM_OFFSET) {
            this.#vars.x_offset = Math.floor(Math.random() * (this.#vars.center_x * 2 / 3) + 1)
            this.#vars.x_offset = this.#vars.x_offset * (Math.random() < 0.5 ? -1 : 1)
            this.#vars.y_offset = Math.floor(Math.random() * (this.#vars.center_y * 2 / 3) + 1)
            this.#vars.y_offset = this.#vars.y_offset * (Math.random() < 0.5 ? -1 : 1)
        } else {
            this.#vars.x_offset = 0
            this.#vars.y_offset = 0
        }

        //  Clear the canvas
        this.#vars.ctx.fillStyle = this.BACKGROUND_COLOR
        this.#vars.ctx.fillRect(0, 0, this.#vars.width, this.#vars.height)
    }

    /*
     * Internal functions
     */
    static #funcs = {
        /*
         * Generate a random x,y offset for drawing the wheel
         */
        setOffset: () => {
            this.#vars.x_offset = Math.floor(Math.random() * (this.#vars.center_x * 2 / 3) + 1)
            this.#vars.x_offset = this.#vars.x_offset * (Math.random() < 0.5 ? -1 : 1)
            this.#vars.y_offset = Math.floor(Math.random() * (this.#vars.center_y * 2 / 3) + 1)
            this.#vars.y_offset = this.#vars.y_offset * (Math.random() < 0.5 ? -1 : 1)
        },

        /*
         * Function to check if a number is prime
         */
        isPrime: (num) => {
            for(var i = 2; i < num; i++) {
                if(num % i == 0) return false
            }
            return true
        },

        /*
         * Animation function
         */
        animate: () => {
            //  Prime number found, draw it using cartesian coordinates
            if(this.#funcs.isPrime(this.#vars.last_prime)) {
                if(this.#vars.SPAM) console.log("Found prime: " + this.#vars.last_prime)
                this.#vars.ctx.font = this.FONT_SIZE + " " + this.FONT_FACE
                this.#vars.ctx.fillStyle = this.FONT_COLOR
                this.#vars.ctx.fillText(
                    this.#vars.last_prime,
                    (this.#vars.center_x + this.#vars.x_offset) + (this.#vars.last_prime * Math.cos(this.#vars.last_prime)),
                    (this.#vars.center_y + this.#vars.y_offset) - (this.#vars.last_prime * Math.sin(this.#vars.last_prime))
                )
            }

            this.#vars.last_prime++  //  Increment counter to check for next prime

            //  Once the wheel reaches (1400 * SCALE) then reset
            if(this.#vars.last_prime > 1400 * this.#vars.SCALE) {
                console.log("Resetting prime wheel effect")
                this.reset()
            }
        },

        /*
         * Function to register the prime wheel cookie
         */
        regCookie: (cookie_value) => {
            if(document.cookie.search("prime_wheel_running=") == -1) {
                this.#funcs.setCookie(cookie_value)
            }
        },

        /*
         * Function to set the prime wheel cookie - expires after 24hrs
         */
        setCookie: (cookie_value) => {
            document.cookie = `prime_wheel_running=${cookie_value} SameSite=Strict Max-Age=86400 Path=/`
        },

        /*
         * Function to check prime_wheel_running cookie value
         * Return true if set to true, false if set to false or not set
         */
        getCookie: () => {
            if(document.cookie.search("prime_wheel_running=") == -1) return false
            if(document.cookie.search("prime_wheel_running=true") == -1) return false
            return true
        }
    }

    /*
     * Start the effect
     */
    static start() {
        if(this.#funcs.getCookie()) {
            this.#vars.animate_proc = setInterval(function() { this.#funcs.animate() }, this.INTERVAL)
            console.log("Running prime wheel effect")
        } else {
            var x = document.getElementById(this.CANVAS_NAME)
            x.style.display = "none"
        }
    }

    /*
     * Toggle effect on/off
     */
    static toggle() {
        var x = document.getElementById(this.CANVAS_NAME)
        if (x.style.display === "none") {
            //  If off turn on
            this.#funcs.setCookie("true")
            x.style.display = "block"
            this.#vars.animate_proc = setInterval(function() { this.#funcs.animate() }, this.INTERVAL)
            console.log("Prime wheel toggeled on")
        } else {
            //  Otherwise turn off
            this.#funcs.setCookie("false")
            x.style.display = "none"
            clearInterval(this.#vars.animate_proc)
            console.log("Prime wheel toggeled off")
        }
    },

    /*
     * Resets the effect
     */
    static reset() {
        this.#vars.ctx.fillStyle = this.BACKGROUND_COLOR
        this.#vars.ctx.fillRect(0, 0, this.#vars.width, this.#vars.height)
        if(this.USE_RANDOM_OFFSET) this.#vars.setOffset()
        this.#vars.last_prime = 2
    }
}