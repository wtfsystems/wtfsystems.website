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
        this.postTitles = null
        this.postsLocation = location
    }

    /*
     * Get the posts json object.
     * Call after initialization of the command.
     */
    async getPosts() {
        this.posts = await axios.get(this.postsLocation)
        this.posts = this.posts.data  //  Clean-up extra data
        this.postTitles = Object.keys(this.posts)
    }

    /*
     * Process posts command.
     */
    exec(args) {
        if(args.length > 0)
            return this.render.post(this.posts, args[0])
        return this.render.postList(this.postTitles)
    }

    /*
     * Render functions.
     */
    render = {
        /*
         * Render the post list.
         */
        postList(postTitles) {
            var list = "POSTS<br/><br/>"

            for(var i = 0; i < postTitles.length; i++) {
                list += postTitles[i] + "<br/>"
            }

            return list
        },

        /*
         * Render a single post
         */
        post(posts, name) {
            var res = posts[name]
            if(res !== undefined) {
                var post = res.content

                console.log(post)
                // now do cleanup / processing
                post.replace(/\\n/g, "<br/>")
                // done
                console.log(post)

                return post
            }
            return `Post '${name}' not found.`
        }
    }

    /*
     * PostRenderer parameters.
     */
    command = "posts"
    description = "Display blog posts"
}
