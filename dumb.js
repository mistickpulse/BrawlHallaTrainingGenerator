// This line MUST be first, for discord.js to read the process envs!
require('dotenv').config();
const Discord = require("discord.js");

const client = new Discord.Client({
    token: process.env.TOKEN,
    autorun: true
});

client.on("ready", () => {
    console.log("I am ready!");
console.log("Token :" + process.env.TOKEN);
console.log("Prefix:" + process.env.PREFIX);
});

client.on("message", message => {
    message.channel.send(message);
});

// There's zero need to put something here. Discord.js uses process.env.CLIENT_TOKEN if it's available,
// and this is what is being used here. If on discord.js v12, it's DISCORD_TOKEN
client.login(process.env.TOKEN);