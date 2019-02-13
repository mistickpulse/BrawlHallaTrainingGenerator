module.exports = {
    name: 'ping',
    argument: 0,
    description: 'verify that the bot is still online',
    execute(message, args) {
        message.channel.send('Pong.');
    },
};