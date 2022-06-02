/*
 * Le Toucan Has Arrived!
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
        console.log(`You have entered trade chat ${Math.floor(Math.random() * leData.leInterval)}`)
        console.log(leData.leToucan)
    }, leData.leInterval)
}