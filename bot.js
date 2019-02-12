const Discord = require("discord.js");
var logger = require('winston');
require('dotenv').config();

var botPrefix = process.env.PREFIX;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
    token: process.env.TOKEN,
    autorun: true
});

require('http').createServer().listen(3000);

bot.on('ready', () => {
    logger.info('Connected');
logger.info('Logged in as: ');
logger.info(bot.username + ' - (' + bot.id + ')');
bot.user.setActivity("!ztr");
})
;

// Basic Answers
function whoami(message) {
    message.channel.send(
        '**Hi**\n' +
        'Nice to meet you ! My name is **Zoulou** and i am a **brawlhalla personnal trainer**.\n' +
        'I am able to build you a training plan based on your preference for you to **get better** at this game ;)\n' +
        'Call me : \"**' + botPrefix + ' trainme**\" to begin the training <3 or use \"**' + botPrefix + ' help**\" to get any information :)'
    );
}

function ans_help(message) {
    message.channel.send('Oh you got trouble using me ? Let me explain.\n' +
        'First of all, the prefix to invok me is !ztr\n' +
        'Here is the command list that you can use :\n\n' +
        '======================================\n\n' +
        ' * **!ztr whoami:    A quick presentation of me, Zoulou**\n' +
        ' * **!ztr help:      Open this menu**\n' +
        ' * **!ztr trainme:   Ill slide in your dm to build you a personnal training program <3**\n'
    );
}

bot.on('message', async message => {
    logger.info("i get a message :[" + message + "]");
    if (message == "ping") {
        logger.info("i ping here");
        message.channel.send("pong");
    }
    return ;
    if (message.author.bot || message.content.indexOf(botPrefix) !== 0) return;
    var args = message.content.slice(auth.prefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();

    if (cmd.length == 0 || cmd == null) {
        whoami(message);
        return;
    }

    switch (cmd) {
        case 'whoami':
            whoami(message);
            break;
        case 'trainme':
            generate_training(message);
            break;
        case 'help':
            ans_help(message)
        default:
            whoami(message);
            break;
        // Just add any case commands if you want to..
    }
});

//===================

async function gen_msg(message, weaponSet, idx, size) {
    weaponSet.msgslot = await message.author.send(weaponSet.name);
    if (idx > 0) {
        weaponSet.msgslot.react('⬆');
    }
    if (idx < size - 1) {
        weaponSet.msgslot.react('⬇');
    }
    if (idx > 1) {
        weaponSet.msgslot.react('⏫');
    }

    if (idx < size - 2) {
        weaponSet.msgslot.react('⏬');
    }
}

async function generate_training(message) {
    if (message.channel != message.author.dmChannel) {
        message.channel.send(`Seems like you requested a training ${message.author} check your dm's ma boy 👌`);
    }

    message.author.send("This training generation is still under developpement so you can't have access to it right now :(\n" +
        "the first realease of this training should be out asap :)");
    return ;
    var m = await message.author.send("Allright let's build this training plan.\n" +
        "I might need a little help to know your weapon preferences ;)\n" +
        "You can sort the list below in order to get the prefered weapon training consequently\n" +
        "**(this might take a little while to generate the choices so be patients <3)**\n" +
        "=======================" +
        "**validate here when it's done**\n");
    m.react('☑');
    m = null;

    var tmp = {
        name: null,
        msgslot : null
    };
    var weaponOrder = new Map();

    weaponOrder.set("Sword", null);
    weaponOrder.set("Cannon", null);
    weaponOrder.set("Katars", null);
    weaponOrder.set("Cannon", null);
    weaponOrder.set("Scythe", null);
    weaponOrder.set("Rocket Lance", null);
    weaponOrder.set("Spear", null);
    weaponOrder.set("Gauntlet", null);
    weaponOrder.set("Axe", null);
    weaponOrder.set("Bow", null);
    weaponOrder.set("Orb", null);
    weaponOrder.set("Hammer", null);
    weaponOrder.set("Blasters", null);


    var i = 0;
    for (var [weapName, msg] of weaponOrder) {
        tmp.name = weapName;
        tmp.msgslot = null;
        await gen_msg(message, tmp, i++, weaponOrder.size);
        msg = tmp.msgslot;
    }
}

bot.login(process.env.TOKEN);


