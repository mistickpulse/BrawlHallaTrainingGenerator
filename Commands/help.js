module.exports = {
    name: 'help',
    description: 'show the help of the bot',
    argument: 0,
    execute(message, args) {
        ans_help(message);
    },
};


function ans_help(message) {
    var helpString =
        'Oh you got trouble using me ? Let me explain.\n' +
        'First of all, the prefix to invok me is !ztr\n' +
        'Here is the command list that you can use :\n\n' +
        '======================================\n\n';
    for (var [cmdName, command] of message.client.commands) {
        helpString += "* **!ztr " + cmdName + "**:\t\t    " + command.description + "\n";
    }
    message.reply(helpString);
}