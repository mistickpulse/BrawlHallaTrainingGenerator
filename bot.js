var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var botPrefix = '!ztr';
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.game = '!ztr';
});

// Basic Answers
function foo(bot, user, userID, channelID, message, evt) {
    bot.sendMessage({
        to: channelID,
        message: '**Hi**\n' +
        'Nice to meet you ! My name is **Zoulou** and i am a **brawlhalla personnal trainer**.\n' +
        'I am able to build you a training plan based on your preference for you to **get better** at this game ;)\n' +
        'Call me : \"**' + botPrefix + ' trainme**\" to begin the training <3 or use \"**' + botPrefix + '** help\" to get any information :)'
    });
}

function ans_help(bot, user, userID, channelID, message, evt) {
    bot.sendMessage({
        to: channelID,
        message: 'Oh you got trouble using me ? Let me explain.\n' +
            'First of all the prefix to invok me is !ztr\n' +
            'Here is the command list that you can use :\n\n' +
            '======================================\n\n' +
            ' * **!ztr whoami**   \t\t\t\tA quick presentation of me, Zoulou\n' +
            ' * **!ztr help**       \t\t\t\tOpen this menu\n' +
            ' * **!ztr traime**   \t\t\t\tIll slide in your dm to build you a personnal training program <3\n'
    });
}

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, botPrefix.length) == botPrefix) {
        var args = message.substring(botPrefix.length).split(' ');
        var cmd = args[1];

        if (args[1] == null) {
            ans_help(bot, user, userID, channelID, message, evt);
            return;
        }
        else {
            bot.sendMessage({
                to: channelID,
                message: 'je suis pas vide :[' + args[1] + ']'
            });
        }
        switch (cmd) {
            // !ping
            case 'whoami':
                foo(bot, user, userID, channelID, message, evt);
                break;
            case 'help':
            default:
                ans_help(bot, user, userID, channelID, message, evt);
                break;
            // Just add any case commands if you want to..
        }
    }
});
