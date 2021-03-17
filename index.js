var http = require('http');
class TS3API {
    constructor(apitoken, host, port) {
        this.apitoken = apitoken;
        this.host = host;
        this.port = port;
        this.auth = 'Basic ' + Buffer.from(apitoken).toString('base64');
    }

    /**
     * @param {string} botname Not the Teamspeak³ nickname. But the Bot config name
     * @returns {Number} Returns null if bot is offline or undefined if bot doesn't exist.
     */
    async getIdByBotname(botname) {
        var bots = await this.getbots();
        for (var i = 0; i < bots.length; i++) {
            if(bots[i].Name == botname){
                return bots[i].Id;
            }
        }
    }

    async getbots() {
        return await makeHttpRequest(this.host, this.port, "/api/bot/list", this.auth)
    }

    async playAudio(botid, url = "") {
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/play/" + encodeURIComponent(url), this.auth)
    }

    /**
     * Can be resumed with playAudio()
     */
    async pauseAudio(botid) {
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/pause", this.auth)
    }

    /**
     * Cannot be resumed. Use pauseAudio if you want to resume the Song later.
     */
    async stopAudio(botid) {
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/stop/", this.auth)
    }

    /**
    * @param {Number} volume "Volume has to be 1-100"
    */
    async setVolume(botid, volume) {
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/volume/" + volume, this.auth)
    }

    /**
     * @returns {Promise<Object>} Returns an Object with the following attributes. (Position, Length, Paused, Link, Title, AudioType)
     */
    async getSong(botid) {
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/song", this.auth)
    }

    async seek(botid, seconds) {
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/seek/" + seconds, this.auth)
    }

    /**
     * Plays the previous song in the playlist.
     */
    async startPreviousSong(botid) {
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/previous/", this.auth)
    }

    /**
     * Plays the next song in the playlist.
     */
    async startNextSong(botid) {
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/next/", this.auth)
    }

    /**
     * @returns {Promise<Number>} Returns Volume from 1-100
     */
    async getVolume(botid) {
        return (await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/volume", this.auth)).Value
    }

    /**
     * Adds a new song to the queue.
     */
    async addSong(botid, url) {
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/add/" + encodeURIComponent(url), this.auth)
    }

    async setAvatar(botid, url){
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/bot/avatar/set/" + encodeURIComponent(url), this.auth)
    }

    async clearAvatar(botid){
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/bot/avatar/clear", this.auth)
    }

    async getServerTree(botid){
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/server/tree", this.auth)
    }

    /**
     * @param {*} type type describes the type of repeat. 0 = disabled; 1 = repeat once; 2 = enabled;
     */
    async repeatEnable(botid, type){
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/repeat/" + repeatTypes[type], this.auth)
    }

    async getRepeatType(botid){
        return await makeHttpRequest(this.host, this.port, "/api/bot/use/" + botid + "/(/repeat/", this.auth)
    }
}

repeatTypes = {
    0: "off",
    1: "one",
    2: "all"
}

function makeHttpRequest(host, port, path, auth) {
    return new Promise((resolve, reject) => {
        http.request({
            host: host,
            path: path,
            port: port,
            headers: {
                "Authorization": auth
            }
        }, (data) => {
            var response = "";
            data.on("data", (chunk) => {
                response += chunk;
            })
            data.on("end", () => {
                if (response == "") {
                    resolve(response);
                } else {
                    resolve(JSON.parse(response))
                }
            })
        }).end();
    })
}

module.exports = TS3API;