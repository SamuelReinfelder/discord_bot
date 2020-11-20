module.exports = {
    name: 'split',
    description: 'Split channel members in several channels.',
    execute(message, args, client, config) {

        const amount = parseInt(args[0]);
        const splitValues = [2, 3, 4];
        const authorID = message.author.id;
        const author = message.guild.voiceStates.cache.get(authorID);


        if (!splitValues.includes(amount)) {
            message.channel.send("Nur Aufteilungen in: " + splitValues.toString() + " möglich.");
            return;
        }

        if (author == undefined)
            return;

        if (author.channelID == null)
            return;

        // Get number of members in channel
        let startChannel = author.channelID;
        let members = message.guild.channels.cache.get(startChannel).members;
        let memberIds = [];

        members.forEach(m => {
            memberIds.push(m.user.id);
        }); 
        
        // Randomize members
        for(let i = memberIds.length-1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = memberIds[i]
            memberIds[i] = memberIds[j]
            memberIds[j] = temp
          }

        let moveChannels = [];

        message.guild.channels.cache.forEach(c => {
            if (c.type == "voice" && c.id != author.channelID && c.members.size == 0) {
                moveChannels.push(c.id);
            }
        });
        moveChannels.push(startChannel);

        if (moveChannels.length < amount) {
            message.channel.send("Zuwenig freie Channels verfügbar.");
            return;
        }

        for(let i=0;i<memberIds.length;i++) {
            message.guild.members.cache.get(memberIds[i]).voice.setChannel(moveChannels[i%amount]);
        }
        message.delete();
    },
};