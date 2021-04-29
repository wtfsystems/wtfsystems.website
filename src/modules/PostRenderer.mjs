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

export class PostRenderer {
    async getPosts() {
        const res = await axios.get('api/posts.json')
        console.log(res)
    }
}
