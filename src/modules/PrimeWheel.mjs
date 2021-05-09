/*
 * Web Terminal Interface
 *
 * Filename:  PrimeWheel.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Prime Wheel Effect command.
 */

import { Command } from './Command.mjs'

export class PrimeWheel extends Command {
    /*
     * Initialize PrimeWheel.
     */
    constructor() {
        super()
        this.canvas = document.getElementById(this.canvas_name)
        this.ctx = this.canvas.getContext("2d")

        this.canvas.width = this.canvas.clientWidth * this.scale
        this.canvas.height = this.canvas.clientHeight * this.scale

        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height

        this.center_x = this.width / 2
        this.center_y = this.height / 2

        this.last_prime = 2

        this.x_offset = 0
        this.y_offset = 0
        this.animate_proc = null
    }

    /*
     * Process command.
     */
    exec(args) {
        if(String(args[0]).toLowerCase() === "start") {
            this.prime_wheel_start()
            return "Prime wheel started."
        }
        if(String(args[0]).toLowerCase() === "stop") {
            this.prime_wheel_stop()
            return "Prime wheel stopped."
        }
        if(String(args[0]).toLowerCase() === "reset") {
            this.reset()
            return "Prime wheel reset."
        }
        return "Usage: primewheel start|stop|reset"
    }

    /*
     * Function to check if a number is prime.
     */
    is_prime(num) {
        for(var i = 2; i < num; i++) {
            if(num % i == 0) return false
        }
        return true
    }

    /*
     * Generate a random x,y offset for drawing the wheel.
     */
    set_offset() {
        this.x_offset = Math.floor(Math.random() * (this.center_x * 2 / 3) + 1)
        this.x_offset = this.x_offset * (Math.random() < 0.5 ? -1 : 1)
        this.y_offset = Math.floor(Math.random() * (this.center_y * 2 / 3) + 1)
        this.y_offset = this.y_offset * (Math.random() < 0.5 ? -1 : 1)
    }

    /*
     * Resets the effect.
     */
    reset() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.last_prime = 2
        if(this.use_random_offset) this.set_offset()
    }

    /*
     * Start the prime wheel.
     */
    prime_wheel_start() {
        var x = document.getElementById(this.canvas_name)
        x.style.display = "block"
        this.reset()
        this.animate_proc = setInterval(() => {
            //  Prime number found, draw it using cartesian coordinates
            if(this.is_prime(this.last_prime)) {
                if(this.spam) console.log("Found prime: " + this.last_prime)
                this.ctx.font = this.font_size + " " + this.font_face
                this.ctx.fillStyle = this.font_color
                this.ctx.fillText(this.last_prime,
                    (this.center_x + this.x_offset) + (this.last_prime * Math.cos(this.last_prime)),
                    (this.center_y + this.y_offset) - (this.last_prime * Math.sin(this.last_prime))
                )
            }

            this.last_prime++  //  Increment counter to check for next prime

            //  Once the wheel reaches (1400 * scale) then reset
            if(this.last_prime > 1400 * this.scale) {
                console.log("Resetting prime wheel effect")
                this.reset()
            }
        }, this.interval)
        console.log("Prime wheel started")
    }

    /*
     * Stop the prime wheel.
     */
    prime_wheel_stop() {
        this.reset()
        var x = document.getElementById(this.canvas_name)
        x.style.display = "none"
        clearInterval(this.animate_proc)
        console.log("Prime wheel stopped")
    }

    /*
     * PrimeWheel parameters.
     */
    command = "primewheel"
    description = "Prime Wheel Effect"

    /*
     * Config parameters.
     */
    /* Sets the font color */
    font_color = "#ff4500"
    /* Sets the font size */
    font_size = "32px"
    /* Sets the font face */
    font_face = "Arial"
    /* Set the scale factor for the wheel */
    scale = 4
    /* Timer interval to draw (milliseconds) */
    interval = 1
    /* ID of canvas to draw to */
    canvas_name = "animation_canvas"
    /* Use random offset */
    use_random_offset = true
    /* Spam console with prime numbers */
    spam = true
}
