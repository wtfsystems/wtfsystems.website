/*
 * Web Terminal Interface
 *
 * Filename:  PostRenderer.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Object to render blog posts.
 * Called within the TermCommands module.
 */

import axios from 'axios'
import { Command } from './Command.mjs'

export class PostRenderer extends Command {
    /*
     * Initialize PostRenderer.
     */
    constructor() {
        super()
        this.posts = null
    }

    /*
     * Get the posts json object.
     * Call after initialization to get the posts object.
     */
    async getPosts() {
        this.posts = await axios.get('api/posts.json')
    }

    /*
     * Process posts command.
     */
    exec(args) {
        if(args.length > 0) {
            return "yes args"
        }
        return "no args"
    }

    /*
     * PostRenderer parameters.
     */
    command = "posts"
    description = "Display blog posts"
}
