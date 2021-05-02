/*
 * Web Terminal Interface
 *
 * Filename:  PostRenderer.mjs
 * By:  Matthew Evans
 * See LICENSE.md for copyright information.
 * 
 * Object to render blog posts.
 * Gets loaded into the TermCommands module.
 */

import axios from 'axios'
import { Command } from './Command.mjs'

export class PostRenderer extends Command {
    /*
     * Initialize PostRenderer.
     */
    constructor(location) {
        super()
        if(location == null)
            throw new Error("'PostRenderer' Error: Must set a posts location.")
        this.posts = null
        this.postsLocation = location
    }

    /*
     * Get the posts json object.
     * Call after initialization of the command.
     */
    async getPosts() {
        this.posts = await axios.get(this.postsLocation)
    }

    /*
     * Process posts command.
     */
    exec(args) {
        if(args.length > 0)
            return this.render.post(this.posts, args[0])
        return this.render.postList(this.posts)
    }

    /*
     * Render functions
     */
    render = {
        /*
         * Render the post list
         */
        postList(posts) {
            var list = "POSTS<br/><br/>"
            var postTitles = Object.keys(posts.data)

            for(var i = 0; i < postTitles.length; i++) {
                list += postTitles[i] + "<br/>"
            }

            return list
        },

        post(posts, name) {
            //  Verify post name
            if(name == null) {
                return "not found"
            }

            var post = "POST"
            return post
        }
    }

    /*
     * PostRenderer parameters.
     */
    command = "posts"
    description = "Display blog posts"
}
