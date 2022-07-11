/*
 * Le Toucan Has Arrived!
 *
 * Filename:  leToucan.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  42
 *
 * Copyright (c) 2022 Matthew Evans - See LICENSE.md
 *
 */
const leData = {
    leProcess: null,
    leInterval: 800,
    leToucan: `
        ░░░░░░░░▄▄▄▀▀▀▄▄███▄░░░░░░░░░░░░░░
        ░░░░░▄▀▀░░░░░░░▐░▀██▌░░░░░░░░░░░░░
        ░░░▄▀░░░░▄▄███░▌▀▀░▀█░░░░░░░░░░░░░
        ░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌░░░░░░░░░░░░
        ░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄░░░░░░░░░░░
        ░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄░░░░░░
        ░░░░░░░░░░░░░▐░░░░▐███████████▄░░░
        ░░░░░le░░░░░░░▐░░░░▐█████████████▄
        ░░░░toucan░░░░░░▀▄░░░▐█████████████▄ 
        ░░░░░░has░░░░░░░░▀▄▄███████████████ 
        ░░░░░arrived░░░░░░░░░░░░█▀██████░░`
}

const leSpam = (newInterval) => {
    if(newInterval !== undefined) leData.leInterval = newInterval
    leData.leProcess = setInterval(() => { 
        console.log(`You have entered trade chat ${Math.floor(Math.random() * 999)}`)
        console.log(leData.leToucan)
    }, leData.leInterval)
}