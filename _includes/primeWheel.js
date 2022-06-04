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

/**
 * Prime Wheel class
 */
class primeWheel {
    /*
     * Config variables
     */
    static BACKGROUND_COLOR = "#000000"       //  Background color
    static FONT_COLOR = "#0000FF"             //  Font color
    static FONT_SIZE = "16px"                 //  Font size
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
        start_called: null,
        canvas: null,
        ctx: null,
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
        //  Make sure the canvas element exists
        if(this.#vars.canvas == null || this.#vars.canvas == undefined) {
            //  If not inject it after the body tag
            document.body.insertAdjacentHTML("afterbegin",
                `<canvas id="${this.CANVAS_NAME}" style="position: fixed; top: 0; left: 0;"></canvas>`)
            this.#vars.canvas = document.getElementById(this.CANVAS_NAME)
        }
        this.#vars.ctx = this.#vars.canvas.getContext("2d")

        //  Make the canvas fit the screen
        this.#vars.canvas.width = window.innerWidth
        this.#vars.canvas.height = window.innerHeight
        //  Calculate center position in the canvas
        this.#vars.center_x = this.#vars.ctx.canvas.width / 2
        this.#vars.center_y = this.#vars.ctx.canvas.height / 2

        this.#vars.last_prime = 2  //  Start at 2 for finding primes

        //  Set an offset if enabled
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
        this.#vars.ctx.fillRect(0, 0, this.#vars.ctx.canvas.width, this.#vars.ctx.canvas.height)

        this.#vars.start_called = false  //  Allow start to be called
    }

    /*
     * Internal functions
     */
    static #funcs = {
        /**
         * Generate a random x,y offset for drawing the wheel
         */
        setOffset: () => {
            this.#vars.x_offset = Math.floor(Math.random() * (this.#vars.center_x * 2 / 3) + 1)
            this.#vars.x_offset = this.#vars.x_offset * (Math.random() < 0.5 ? -1 : 1)
            this.#vars.y_offset = Math.floor(Math.random() * (this.#vars.center_y * 2 / 3) + 1)
            this.#vars.y_offset = this.#vars.y_offset * (Math.random() < 0.5 ? -1 : 1)
        },

        resize: () => {
            //  Make the canvas fit the screen
            this.#vars.canvas.width = window.innerWidth
            this.#vars.canvas.height = window.innerHeight
            //  Calculate center position in the canvas
            this.#vars.center_x = this.#vars.ctx.canvas.width / 2
            this.#vars.center_y = this.#vars.ctx.canvas.height / 2
            this.reset()
        },

        /**
         * Check if a number is prime
         * @param {*} num 
         * @returns 
         */
        isPrime: (num) => {
            for(var i = 2; i < num; i++) {
                if(num % i == 0) return false
            }
            return true
        },

        /**
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

        /**
         * Register the prime wheel cookie
         * @param {*} cookie_value 
         * @rerurns True if it was registered, false if it was not.
         */
        regCookie: (cookie_value) => {
            if(document.cookie.search("prime_wheel_running=") == -1) {
                this.#funcs.setCookie(cookie_value)
                return true
            }
            return false
        },

        /**
         * Set the prime wheel cookie - expires after 1wk
         * @param {*} cookie_value 
         */
        setCookie: (cookie_value) => {
            document.cookie = `prime_wheel_running=${cookie_value} SameSite=Strict Max-Age=604800 Path=/`
        },

        /**
         * Check the prime_wheel_running cookie value
         * @returns True if cookie is set to true, false if set to false or not set
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
        if(this.#vars.start_called) {
            console.log("Prime wheel effect already running")
            return
        }
        this.#vars.start_called = true
        //  Register cookie if one does not exist.
        //  If it does and it's set to false, regCookie will just fail.
        if(this.#funcs.getCookie()) this.#funcs.regCookie(true)
        if(this.#funcs.getCookie()) {
            this.#vars.canvas.style.display = "block"
            this.#vars.animate_proc = setInterval(this.#funcs.animate, this.INTERVAL)
            console.log("Running prime wheel effect")
        } else {
            console.log("Prime wheel effect disabled by setting")
            this.#vars.canvas.style.display = "none"
        }
    }

    /*
     * Toggle effect on/off
     */
    static toggle() {
        if (this.#vars.canvas.style.display === "none") {
            //  If off turn on
            this.#funcs.setCookie("true")
            this.#vars.canvas.style.display = "block"
            this.#vars.animate_proc = setInterval(this.#funcs.animate, this.INTERVAL)
            console.log("Prime wheel toggeled on")
        } else {
            //  Otherwise turn off
            this.#funcs.setCookie("false")
            this.#vars.canvas.style.display = "none"
            clearInterval(this.#vars.animate_proc)
            console.log("Prime wheel toggeled off")
        }
    }

    /*
     * Resets the effect
     */
    static reset() {
        this.#vars.ctx.fillStyle = this.BACKGROUND_COLOR
        this.#vars.ctx.fillRect(0, 0, this.#vars.ctx.canvas.width, this.#vars.ctx.canvas.height)
        if(this.USE_RANDOM_OFFSET) this.#funcs.setOffset()
        this.#vars.last_prime = 2
    }
}