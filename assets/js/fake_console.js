/*
 * Quick script to display text in the fake console.
 * It's not sensitive data, so let's be lazy and use the URL.
 *
 * Filename:  fake_console.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  022721
 * 
 * Copyright (c) 2021 Matthew Evans
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

window.onload = function() {
    var search_string = "fakeconsole=";
    if(window.location.href.search(search_string) != -1) {
        //  Find just the part of the URL with the text we want to display
        var out_text = window.location.href.substring(
            window.location.href.search(search_string) + search_string.length,
            window.location.href.length
        ).replace(/\+/g, " ").replace(/\%2F/g, "/").replace(/\%5C/g, "\\").replace(/%2B/g, "+").replace(/%24/g, "$").replace(/%21/g, "!").replace(/%40/g, "@").replace(/%23/g, "#").replace(/%25/g, "%");
        //  The long line of replaces above cleans up the output a bit

        //  Silliness
        out_text = "command not found:  " + out_text;
        if(out_text.search("printenv") != -1 ) {
            out_text = "These are not the environment variables that you are looking for";
        }
        if(out_text.search("dog") != -1 ) {
            out_text = out_text.replace(/dog/g, "doge");
        }
        if(out_text.search("cat") != -1 ) {
            out_text = out_text.replace(/cat/g, "dog");
        }
        if(out_text.search("systemctl start skynet") != -1) {
            out_text = "SKYNET SERVICE STARTED!!!";
        }
        if(out_text.search("sudo") != -1 ) {
            out_text = "Nope! Not here!";
        }

        //  Display output
        document.getElementById("fakeconsole_output").innerHTML = out_text;
    }
}