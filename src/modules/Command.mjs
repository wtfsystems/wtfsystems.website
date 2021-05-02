/*
 * Web Terminal Interface
 *
 * Filename:  Command.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Command abstract base class.
 */

export class Command {
    /*
     *
     */
    constructor() {
        if(this.constructor === Command) {
            throw new Error("Command class is abstract.")
        }
    }

    /*
     *
     */
    exec() {
        throw new Error("Method 'exec()' must be implemented.")
    }

    command = "error"
    description = "error"
}
