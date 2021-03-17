var ts3api = require("../index");

var tsapi = new ts3api("", "", 58913);

async function asyncfunction() {
    var botid = tsapi.getIdByBotname("botname")

    await tsapi.stopAudio(botid)
    await tsapi.pauseAudio(botid)
    await tsapi.playAudio(botid, "https://www.youtube.com/watch?v=39UDZMgPg5k")
    await tsapi.setVolume(50);
    await tsapi.getSong(botid); //Returns an Object with the following attributes. (Position, Length, Paused, Link, Title, AudioType)
    await tsapi.seek(botid, 5); //skips song to 5 seconds
    await tsapi.startPreviousSong(botid);
    await tsapi.startNextSong(botid);
    await tsapi.getVolume(botid);
    await tsapi.addSong(botid, "https://www.youtube.com/watch?v=39UDZMgPg5k"); //Adds a new song to the queue.
    await tsapi.setAvatar(botid, "https://pbs.twimg.com/profile_images/618435565159997441/Dn7G6RLB.jpg");
    await tsapi.clearAvatar(botid);
    await tsapi.getServerTree(botid);
    await tsapi.setRepeatType(botid, 0); //disable repeat
    await tsapi.getRepeatType(botid);
}





asyncfunction()