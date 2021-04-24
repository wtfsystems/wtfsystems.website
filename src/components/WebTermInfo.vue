<!--
    Commentblock
-->

<template>
    <div class="term-info">
         <span class="time">{{ currentTime }}</span><span class="user">you@wtfsystems.net</span><span class="site">www.wtfsystems.net</span>
    </div>
</template>

<script>
export default {
    name: 'WebTermInfo',
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
    font-family: $term_font_family;
    font-size: $term_font_size;
    margin-bottom: 6px;
}

.time {
    background-color: $time_bg_color;
    color: $time_fg_color;
    padding: 4px;
    padding-bottom: 3px;
}

.user {
    background-color: $user_bg_color;
    color: $user_fg_color;
    padding: 4px;
    padding-bottom: 3px;
}

.site {
    background-color: $site_bg_color;
    color: $site_fg_color;
    padding: 4px;
    padding-bottom: 3px;
}
</style>
