const Discord = require("discord.js");
var logger = require('winston');
require('dotenv').config();

var botPrefix = "!ztr";

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
    if (message.author.bot || message.content.indexOf(botPrefix) !== 0) {
        return;
    }
    var args = message.content.slice(botPrefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();

    if (cmd.length == 0 || cmd == null) {
        whoami(message);
        return;
    }

    switch (cmd) {
        case 'ping':
            message.channel.send("!pong");
            break;
        case 'whoami':
            whoami(message);
            break;
        case 'trainme':
            //generate_training(message);
            message.author.send("This training generation is still under developpement so you can't have access to it right now :(\n" +
            "the first realease of this training should be out asap :)");
            break;
        case 'help':
            ans_help(message);
            break;
        case 'hyped':
            generate_training(message);
            break;
        default:
            whoami(message);
            break;
    }
});

//===================

function gen_reaction(message, weaponOrderCollection) {
    var idx = 0;
    for (var [weapName, msg] of weaponOrderCollection) {
        if (idx > 0) {
            msg.react('⬆');
        }
        if (idx < weaponOrderCollection.size - 1) {
            msg.react('⬇');
        }
        if (idx > 1) {
            msg.react('⏫');
        }
        if (idx < weaponOrderCollection.size - 2) {
            msg.react('⏬');
        }
        ++idx;
    }
}

async function generate_training(message) {
    if (message.channel != message.author.dmChannel) {
        message.channel.send(`Seems like you requested a training ${message.author} check your dm's ma boy 👌`);
    }


    var m = await message.author.send("Allright let's build this training plan.\n" +
        "I might need a little help to know your weapon preferences ;)\n" +
        "You can sort the list below in order to get the prefered weapon training consequently\n" +
        "**(this might take a little while to generate the choices so be patients <3)**\n" +
        "=======================" +
        "**validate here when it's done**\n");
    m.react('☑');
    m = null;

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


    for (var [weapName, msg] of weaponOrder) {
        msg = await message.author.send(weapName);
    }
    gen_reaction(message, weaponOrder);
}

bot.login(process.env.TOKEN);


