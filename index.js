const Discord = require("discord.js");
const config = require("./config.json");
const fs = require('fs');
const yaml = require('js-yaml');
const { getHeapCodeStatistics } = require("v8");

const client = new Discord.Client();


client.on('ready', () => {

	client.user.setStatus('invisible');

	client.guilds.cache.forEach((guild) => {
		let data = {
			type : "Data from status discord bot",
			member: {} 
		};
		data.name =guild.name;
		data.id =guild.id;
		const channels = guild.channels.cache.filter(c => c.type === 'voice');

		for (const [channelID, channel] of channels) {
			for (const [memberID, member] of channel.members) {
				data["member"][memberID] = {
					"name": member.user.username,
					"mute": guild.voiceStates.cache.get(memberID).selfMute,
					"deaf": guild.voiceStates.cache.get(memberID).selfDeaf};
			}
		}
		writeData(data,guild.id);
	});
	
});

client.on("voiceStateUpdate", function (oldMember, newMember) {

	let data = getData(newMember.guild.id);

	if (newMember.channelID != null) {
		data["member"][newMember.id] = {
			"name": client.users.cache.get(newMember.id).username,
			"mute": newMember.guild.voiceStates.cache.get(newMember.id).selfMute,
			"deaf": newMember.guild.voiceStates.cache.get(newMember.id).selfDeaf
			};
	}
	else {
		delete data["member"][oldMember.id];
	}

	writeData(data,oldMember.guild.id);

});


client.login(config.BOT_TOKEN);


function writeData(data,id) {
	var dir = './server';

		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		fs.writeFileSync('server/voice_status_' + id + '.yaml', yaml.safeDump(data), 'utf8');
}

function getData(id) {
try {
		let fileContents = fs.readFileSync('server/voice_status_' + id + '.yaml', 'utf8');
		return yaml.safeLoad(fileContents);

	} catch (e) {
		console.log(e);
	}
}

