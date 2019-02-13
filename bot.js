const Discord = require("discord.js");
const fs = require('fs');
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

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));


//require('http').createServer().listen(3000);

bot.on('ready', () => {
    bot.user.setActivity("!ztr");
    logger.info("========== Login Informations =========");
    logger.info('Connected');
    logger.info('Logged in as: ' + bot.user.username);
    logger.info("=====================");
    logger.info("-- Loading Commands :");
    for (const file of commandFiles) {
        const command = require(`./Commands/${file}`);
        if (command.name != undefined && command.name != null) {
            logger.info("     " + file + " -> " + command.name + " : loaded");
        }
        else {
            logger.error("/!\\  " + file + " -> ERROR" );
            continue;
        }
        bot.commands.set(command.name, command);
    }
});

bot.on('message', async message => {
    if (message.author.bot || message.content.indexOf(botPrefix) !== 0) {
        return;
    }
    var args = message.content.slice(botPrefix.length).trim().split(/ +/g);
    var cmdName = args.shift().toLowerCase();

    if (!bot.commands.has(cmdName)) {
        bot.commands.get('whoami').execute(message, args);
        return ;
    }

    const command = bot.commands.get(cmdName);
    if (args.length < command.argument) {
        message.reply("unfortunately you have give the wrong quantity of argument\n" +
            "I am not able to work with that :(.");
        return ;
    }
    try {
        command.execute(message, args);
    }
    catch (error) {
        logger.error(error);
        message.reply("Something has gone wrong through the execution of this command, sorry :(");
    }
});

bot.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.author.bot) return ;
    logger.info("Starting Reaction");
});


bot.login(process.env.TOKEN);


