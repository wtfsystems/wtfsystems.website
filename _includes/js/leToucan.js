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
    leData.leProcess = setInterval(console.log(leData.leToucan), leData.leInterval)
}