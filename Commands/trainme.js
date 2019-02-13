module.exports = {
    name: 'trainme',
    description: 'training generator',
    argument: 0,
    execute(message, args) {
        generate_training(message);
    },
};



async function generate_training(message) {
    message.author.send("Unfortunately this training generator is still under developpement :( (finished soon :))");
    return ;
    if (message.channel != message.author.dmChannel) {
        message.channel.send(`Seems like you requested a training ${message.author} check your dm's ma boy 👌`);
    }


    var m = await message.author.send("Allright let's build this training plan.\n" +
        "I might need a little help to know your weapon preferences ;)\n" +
        "You can sort the list below in order to get the prefered weapon training consequently\n" +
        "**(this might take a little while to generate the choices so be patients <3)**\n" +
        "=======================" +
        "**validate here when it's done**\n");

    var weaponOrder = new Map();
    var letterReaction = [
        "🇦",
        "🇧",
        "🇨",
        "🇩",
        "🇪",
        "🇫",
        "🇬",
        "🇭",
        "🇮",
        "🇯",
        "🇰",
        "🇱",
        "🇲"
    ];

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
        try {
              msg.react(letterReaction[0]);
            }
            catch (error) {
                console.log("Emoji not found :" + error);
            }
    }
    console.log("fini");
    m.react('☑');
    m = null;
}

