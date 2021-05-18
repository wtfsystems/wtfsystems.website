<!--
    Web Terminal Interface

    Filename:  WebTermInfo.vue
    By:  Matthew Evans
    See LICENSE.md for copyright information.
-->

<template>
    <div class="term-info">
         <span class="time">{{ currentTime }}</span><span class="user">{{ userip }}</span><span class="site"><a href="https://www.wtfsystems.net" style="color: inherit; text-decoration: none;">www.wtfsystems.net</a></span>
    </div>
</template>

<script>
export default {
    name: 'WebTermInfo',
    props: {
        userip: String     //  User's IP address
    },
    computed: {
        //  Return current time in 24hr HH:MM:SS format
        currentTime() {
            const options = {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
            return new Date().toLocaleTimeString("en-US", options)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../css/WebTerm.scss';

.term-info {
    display: inline;
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    margin-bottom: 6px;
}

.time {
    background-color: $time_bg_color;
    color: $time_fg_color;
    font-family: inherit;
    font-size: inherit;
    padding: 4px;
    padding-bottom: 3px;
}

.user {
    background-color: $user_bg_color;
    color: $user_fg_color;
    font-family: inherit;
    font-size: inherit;
    padding: 4px;
    padding-bottom: 3px;
}

.site {
    background-color: $site_bg_color;
    color: $site_fg_color;
    font-family: inherit;
    font-size: inherit;
    padding: 4px;
    padding-bottom: 3px;
}
</style>
