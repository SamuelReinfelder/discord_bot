const { MessageFlags } = require("discord.js");

module.exports = {
    name: 'annoy',
    description: 'Change channel rapidly.',
    execute(message, args, client, config) {

        let currentChannel = message.channel.id;
        let authorID = message.author.id;
        let author = message.guild.voiceStates.cache.get(authorID);

        if (author == undefined)
            return;
        
        if (author.channelID == null)
            return;

        // Find empty channel to move to
        message.guild.channels.cache.forEach(c => {
            if (c.type == "voice" && c.id != author.channelID) {
                console.log(c.id);
                let startChannel = author.channelID;
                let moveChannel = c.id;
                let member = message.guild.members.cache.get(authorID);

                for (let i=0;i<5;i++) {
                    member.voice.setChannel(moveChannel);
                    member.voice.setChannel(startChannel);
                }

                break;

                return;
            }

        });
        ;
    },
};