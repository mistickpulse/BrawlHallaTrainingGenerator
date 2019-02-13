module.exports = {
    name: 'whoami',
    description: 'who am i ?',
    argument: 0,
    execute(message, args) {
        message.channel.send(
            '**Hi**\n' +
            'Nice to meet you ! My name is **Zoulou** and i am a **brawlhalla personnal trainer**.\n' +
            'I am able to build you a training plan based on your preference for you to **get better** at this game ;)\n' +
            'Call me : \"**!ztr trainme**\" to begin the training <3 or use \"**!ztr help**\" to get any information :)'
        );
    },
};
