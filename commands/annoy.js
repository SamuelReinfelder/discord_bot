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
        let moveChannel =  message.guild.channels.cache.find(c => c.id != author.channelID && c.type == "voice");

        if(moveChannel == undefined)
            return;

        let startChannel = author.channelID;
        let member = message.guild.members.cache.get(authorID);

        for (let i=0;i<3;i++) {
            member.voice.setChannel(moveChannel);
            member.voice.setChannel(startChannel);
        }
    },
};