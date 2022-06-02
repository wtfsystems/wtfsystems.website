/*
 * Animated background that creates a prime wheel.
 * Uses a cookie to track activity status across multiple page visits.
 *
 * Filename:  primeWheel.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  060222
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
    BACKGROUND_COLOR = "#000000"       //  Background color
    FONT_COLOR = "#0000FF"             //  Font color
    FONT_SIZE = "32px"                 //  Font size
    FONT_FACE = "Arial"                //  Font face
    SCALE = 4                          //  Scale multiplier
    INTERVAL = 5                       //  Speed interval
    CANVAS_NAME = "primewheel_canvas"  //  Target draw canvas
    USE_RANDOM_OFFSET = true           //  Offset center position
    SPAM = false                       //  Spam the console with prime numbers

    /*
     * Initialize
     */
    constructor() {
        this.canvas = document.getElementById(this.CANVAS_NAME)
        this.ctx = this.canvas.getContext("2d")

        this.canvas.width = this.canvas.clientWidth * this.SCALE
        this.canvas.height = this.canvas.clientHeight * this.SCALE

        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height

        this.center_x = this.width / 2
        this.center_y = this.height / 2

        this.last_prime = 2

        this.x_offset = 0
        this.y_offset = 0
        this.setOffset()
        this.animate_proc = null

        //  Clear the canvas
        this.ctx.fillStyle = this.BACKGROUND_COLOR
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    /*
     * Generate a random x,y offset for drawing the wheel
     */
    setOffset() {
        this.x_offset = Math.floor(Math.random() * (this.center_x * 2 / 3) + 1)
        this.x_offset = this.x_offset * (Math.random() < 0.5 ? -1 : 1)
        this.y_offset = Math.floor(Math.random() * (this.center_y * 2 / 3) + 1)
        this.y_offset = this.y_offset * (Math.random() < 0.5 ? -1 : 1)
    }

    /*
     * Resets the effect
     */
    reset() {
        this.ctx.fillStyle = this.BACKGROUND_COLOR
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.last_prime = 2
    }
}

const primeWheelFuncs = {
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
    primeWheelAnimate: (the_wheel) => {
        //  Prime number found, draw it using cartesian coordinates
        if(is_prime(the_wheel.last_prime)) {
            if(the_wheel.SPAM) console.log("Found prime: " + the_wheel.last_prime)
            the_wheel.ctx.font = the_wheel.FONT_SIZE + " " + the_wheel.FONT_FACE
            the_wheel.ctx.fillStyle = the_wheel.FONT_COLOR
            the_wheel.ctx.fillText(
                the_wheel.last_prime,
                (the_wheel.center_x + the_wheel.x_offset) + (the_wheel.last_prime * Math.cos(the_wheel.last_prime)),
                (the_wheel.center_y + the_wheel.y_offset) - (the_wheel.last_prime * Math.sin(the_wheel.last_prime))
            )
        }

        the_wheel.last_prime++  //  Increment counter to check for next prime

        //  Once the wheel reaches (1400 * SCALE) then reset
        if(the_wheel.last_prime > 1400 * the_wheel.SCALE) {
            console.log("Resetting prime wheel effect")
            //  Change offset if enabled
            if(the_wheel.USE_RANDOM_OFFSET) the_wheel.setOffset()
            the_wheel.reset()
        }
    },

    /*
    * Function to toggle background on/off
    */
    primeWheelToggle: (the_wheel) => {
        var x = document.getElementById(the_wheel.CANVAS_NAME)
        if (x.style.display === "none") {
            //  If off turn on
            primeWheelSetCookie("true")
            x.style.display = "block"
            the_wheel.animate_proc = setInterval(function() { primeWheelAnimate(the_wheel) }, the_wheel.INTERVAL)
            console.log("Prime wheel toggeled on")
        } else {
            //  Otherwise turn off
            primeWheelSetCookie("false")
            x.style.display = "none"
            clearInterval(the_wheel.animate_proc)
            console.log("Prime wheel toggeled off")
        }
    },

    /*
    * Function to register the prime wheel cookie
    */
    primeWheelRegCookie: (cookie_value) => {
        if(document.cookie.search("prime_wheel_running=") == -1) {
            primeWheelSetCookie(cookie_value)
        }
    },

    /*
    * Function to set the prime wheel cookie - expires after 24hrs
    */
    primeWheelSetCookie: (cookie_value) => {
        document.cookie = `prime_wheel_running=${cookie_value} SameSite=Strict Max-Age=86400 Path=/`
    },

    /*
    * Function to check prime_wheel_running cookie value
    * Return true if set to true, false if set to false or not set
    */
    primeWheelGetCookie: () => {
        if(document.cookie.search("prime_wheel_running=") == -1) return false
        if(document.cookie.search("prime_wheel_running=true") == -1) return false
        return true
    },

    /*
    * Function to start up the prime wheel
    */
    primeWheelStart: (the_wheel) => {
        if(primeWheelGetCookie()) {
            the_wheel.animate_proc = setInterval(function() { primeWheelAnimate(the_wheel) }, the_wheel.INTERVAL)
            console.log("Running prime wheel effect")
        } else {
            var x = document.getElementById(the_wheel.CANVAS_NAME)
            x.style.display = "none"
        }
    }
}