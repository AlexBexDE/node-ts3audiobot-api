# node-ts3audiobot-api
TS3AudioBot API Client for NodeJS

## Installation
```
npm install node-ts3audiobot-api
```

## Basic Usage
```js
var tsapi = new ts3api("YOUR_API_TOKEN", "HOST", 58913); //initialize API instance

await tsapi.getbots(); //returns List with all Bots and Ids

var botid = tsapi.getIdByBotname("default") //get temporary bot id

console.log(botid) //output: 2

await tsapi.playAudio(botid, "https://www.youtube.com/watch?v=tRBeGm0QMvU"); //play song

await tsapi.stopAudio(botid); //stop song
```

## Functions
```js
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
```

## Repeat types
0: Repeat disabled
1: Repeat once
2: Repeat enabled
