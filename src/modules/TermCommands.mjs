/*
 *
 * Object to render various terminal command results.
 * The WebTerm VueJS app calls this.
 * It's basically used to render the website.
 */

export class TermCommands {

    /*
     * Fill the commands array.
     * Each command is created in its own scope.
     * 
     * Format of the command object:
     * command - input text for command, all lowercase.
     * description - Description of command, displayed in help.
     * function - Lambda expression that the command will execute.
     *            This should have the cmd array passed to it.
     */
    constructor() {
        this.commands = []

        /*
         * motd command
         */
        {let temp = new Object()
        temp.command = "motd"
        temp.description = "Message of the day"
        temp.function = (cmd) => {
            return this.render.motd()
        }
        this.commands.push(temp)}

        /*
         * about command
         */
        {let temp = new Object()
        temp.command = "about"
        temp.description = "Display website information"
        temp.function = (cmd) => {
            return this.render.about()
        }
        this.commands.push(temp)}

        /*
         * printenv command
         */
        {let temp = new Object()
        temp.command = "printenv"
        temp.description = "Print all or part of environment?"
        temp.function = (cmd) => {
            return "These are not the environment variables that you are looking for"
        }
        this.commands.push(temp)}

        /*
         * systemctl command
         */
        {let temp = new Object()
        temp.command = "systemctl"
        temp.description = "Control the systemd system and service manager?"
        temp.function = (cmd) => {
            return this.render.systemctl(cmd.splice(1, cmd.length))
        }
        this.commands.push(temp)}

        /*
         * sudo command
         */
        {let temp = new Object()
        temp.command = "sudo"
        temp.description = "Execute a command as another user?"
        temp.function = (cmd) => {
            if(cmd.length > 1) return this.processCommand(cmd.splice(1, cmd.length))
            return "<span style=\"font-weight: bold;\">SPAWN MORE OVERLORDS!!!</span>"
        }
        this.commands.push(temp)}

        /*
         * jabbascript command
         */
        {let temp = new Object()
        temp.command = "jabbascript"
        temp.description = "Modern development"
        temp.function = (cmd) => {
            return this.render.jabbascript()
        }
        this.commands.push(temp)}

        /*
         * posts command
         */
        {let temp = new Object()
        temp.command = "posts"
        temp.description = "Show posts"
        temp.function = (cmd) => {
            return "posts"
            /*return $.ajax({url: "api/posts.json", success: function(result){
                return result
            }});*/
        }
        this.commands.push(temp)}

        /*
         * extra command
         */
        /*{let temp = new Object()
        temp.command = ""
        temp.description = ""
        temp.function = (cmd) => {
            return cmd
        }
        this.commands.push(temp)}*/
    }

    /*
     * Process a command.
     * Returns a string with the result.
     */
    processCommand(cmd) {
        if(String(cmd[0]).toLowerCase() === "help") return this.render.help(this.commands)
        for(var i = 0; i < this.commands.length; i++) {
            if(String(cmd[0]).toLowerCase() === this.commands[i].command)
                return this.commands[i].function(cmd)
        }
        return "<span style=\"font-weight: bold;\">command not found:</span> " + cmd[0]
    }

    /* ************************************** */
    /* ********** RENDER FUNCTIONS ********** */
    /* ************************************** */

    //  Used to render the various command results.
    //  These should all return a string.

    render = {
        /*
         * help render function
         */
        help(commands) {
            var help = "<table style=\"border: 0px;\">"
            help += "<tr><th style=\"text-align: left;\">Command</th>"
            help += "<th>&nbsp;&nbsp;&nbsp;</th><th>Description</th></tr>"
            for(var i = 0; i < commands.length; i++) {
                help += "<tr>"
                help += "<td><span style=\"font-weight: bold;\">" + commands[i].command + "</span></td>"
                help += "<td>&nbsp;&nbsp;&nbsp;</td>"
                help += "<td>" + commands[i].description + "</td>"
                help += "</tr>"
            }
            help += "<tr><td><span style=\"font-weight: bold;\">clear</span></td>"
            help += "<td>&nbsp;&nbsp;&nbsp;</td>"
            help += "<td>Clear the screen</td></tr></table>"
            return help
        },

        /*
         * motd render function
         */
        motd() {
            return `
            <h3>Welcome to my website!</h3>
            <span style=\"display: flex; flex-direction: row\">
                <span>
                    <img style=\"border-radius: 50%; width: 240px;\" src=\"assets/img/me.png\"/>
                </span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style=\"display: flex; flex-direction: column; line-height: 2;\">
                    Matthew Evans
                    <br/>
                    <a href=\"mailto:contact@wtfsystems.net\">contact@wtfsystems.net</a>
                    <br/>
                    <a href=\"https://github.com/wtfsystems\">GitHub</a>
                </span>
            </span>
            <br/><br/>
            This site emulates a basic terminal.  Type a command below and press enter.<br/>
            For a list of available commands, enter <span style=\"font-weight: bold;\">help</span>
            `
        },

        /*
         * about render funciton
         */
        about() {
            return `
            <span style=\"font-weight: bold;\">Created with:</span><br/>
            <span style=\"height: 120px; max-height: 120px;\">
                <a href=\"https://vuejs.org\"><img src=\"assets/img/512px-Vue.js_Logo_2.svg.png\" style=\"max-height: 120px;\"/></a>
                <a href=\"https://jekyllrb.com\"><img src=\"assets/img/jekyll-logo-dark-transparent.png\" style=\"max-height: 120px;\"/></a>
                <a href=\"https://pages.github.com\"><img src=\"assets/img/octocat.png\" style=\"max-height: 120px;\"/></a>
            </span>
            <br/>
            <a href=\"https://github.com/Splode/jekyll-vue-template\">jekyll-vue-template</a>
            `
        },

        /*
         * systemctl render function
         */
        systemctl(cmd) {
            var usage = "Usage: systemctl [start/stop] [service name]"
            if(typeof cmd[1] === 'undefined') return usage
            if(String(cmd[0]).toLowerCase() === "start") return "Starting service " + cmd[1] + "..."
            if(String(cmd[0]).toLowerCase() === "stop") return "Stopping service " + cmd[1] + "..."
            return usage
        },

        /*
         * jabbascript render function
         */
        jabbascript() {
            return `
            <a href=\"https://devhumor.com/media/bloated-jabbascript-frameworks\">
            <img style=\"width: 90vw; max-width: 420px;\" src=\"assets/img/bloated-jabba.jpg\"/>
            </a>
            `
        }
    }
}
