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
import showdown from 'showdown'
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

        /*
         * Language Lookup Table
         * Use to cross reference the language names incase any changes
         * Example:  c++ becomes cpp
         * 
         * See:
         * https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers
         * And:
         * https://prismjs.com/#supported-languages
         */
        this.langLookup = []

        {let temp = new Object()
        temp.old = "c++"
        temp.new = "cpp"
        this.langLookup.push(temp)}

        {let temp = new Object()
        temp.old = "python"
        temp.new = "py"
        this.langLookup.push(temp)}

        {let temp = new Object()
        temp.old = "javascript"
        temp.new = "js"
        this.langLookup.push(temp)}
        /*
         * End lookup table
         */
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
            return this.render.post(String(args[0]).toLowerCase(), this.posts, this.langLookup)
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
            var numColumns = 2, c = 1

            var list = "<style>"
            list += "table, th, td { border: 1px solid white; }"
            list += "th, td { padding: 8px; }"
            list += "td { text-align: center; }"
            list += "</style>"

            list += "<table>"
            list += "<tr><th colspan=\"" + numColumns + "\">Posts</th></tr>"

            for(var i = 0; i < postTitles.length; i++) {
                if(c == 1) list += "<tr>"
                list += "<td>" + postTitles[i] + "</td>"
                if((i == postTitles.length - 1) && (c < numColumns)) list += "</tr>"
                if(c >= numColumns) {
                    list += "</tr>"
                    c = 1
                }
                c++
            }

            list += "</table>"
            return list
        },

        /*
         * Render a single post.
         *
         * The function will first find and extract any code bocks in the post.
         * A lookup table is used to determine the proper language formatting.
         * These blocks are then formatted with PrismJS.
         * The entire post is then formatted with Showdown.
         * After that, the formatted code blocks are reinserted into the post.
         * The old code formatting blocks are then removed.
         * Finally, the formatted post is returned.
         */
        post(name, posts, langLookup) {
            var res = posts[name]
            if(res !== undefined) {
                var post = res.content

                ///////////////////////////////////////////////
                //            PrismJS Highlighting           //
                ///////////////////////////////////////////////
                //  First, find start/end indices of the code blocks
                const codeStartRx = /{% highlight.*/g
                const codeEndRx = /{% endhighlight %}/g
                var result, startIndices = [], endIndices = []
                while((result = codeStartRx.exec(post)) !== null)
                    startIndices.push(result.index)
                while((result = codeEndRx.exec(post)) !== null)
                    endIndices.push(result.index)

                //  Sanity check
                if((startIndices.length !== endIndices.length) || startIndices.length === 0) {
                    //  Just do the showdown conversion and return
                    let converter = new showdown.Converter()
                    post = converter.makeHtml(post)
                    return post
                }

                //  Capture the code blocks, format them, and store in result array
                var formattedCode = []
                for(var i = 0; i < startIndices.length; i++) {
                    //  Get the text to replace
                    let tempStr = post.substr(startIndices[i], endIndices[i] - startIndices[i])

                    //  Determine code language to format as
                    let oldCode = tempStr.match(/{% highlight.*%}/)[0]
                    oldCode = oldCode.replace("{% highlight ", "").replace(" %}", "")
                    let codeLang = langLookup.find((lang) => {
                        if(lang.old == oldCode) return true
                    }).new
                    //  Fallback, use what was found (risky)
                    if(codeLang === undefined) codeLang = oldCode

                    //  Wipe the code block start tag
                    tempStr = tempStr.substr(tempStr.indexOf("%}") + 2)
                    //  Highlight with PrismJS
                    tempStr = Prism.highlight(tempStr, Prism.languages[codeLang], codeLang)
                    //  Add background formatting
                    tempStr = "<pre class=\"language-" + codeLang + "\">" + tempStr + "</pre>"
                    //  Push to the formatted code array
                    formattedCode.push(tempStr)
                }
                ///////////////////////////////////////////////

                //  Use showdown to process markdown
                let converter = new showdown.Converter()
                post = converter.makeHtml(post)

                ///////////////////////////////////////////////
                //              PrismJS Insertion            //
                ///////////////////////////////////////////////                
                //  Now go back and insert the formatted code
                for(var i = 0; i < formattedCode.length; i++) {
                    //  Calc indices each step, as position will change
                    startIndices = []
                    endIndices = []
                    while((result = codeStartRx.exec(post)) !== null)
                        startIndices.push(result.index)
                    while((result = codeEndRx.exec(post)) !== null)
                        endIndices.push(result.index)

                    //  Do the replacement
                    let tempStr = post.substr(startIndices[i], endIndices[i] - startIndices[i])
                    tempStr = tempStr.substr(tempStr.indexOf("%}") + 2)
                    post = post.replace(tempStr, formattedCode[i])
                }

                //  Clean up the old highlighting
                post = post.replace(/{% highlight.*%}/g, "")
                post = post.replace(/{% endhighlight %}/g, "")
                ///////////////////////////////////////////////

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
