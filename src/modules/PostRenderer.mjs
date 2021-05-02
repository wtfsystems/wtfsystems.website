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
     *
     */
    async getPosts() {
        const res = await axios.get('api/posts.json')
        console.log(res)
    }

    exec(args) {
        if(args.length > 0) {
            return "yes args"
        }
        return "no args"
    }

    command = "posts"
    description = "Display blog posts"
}
