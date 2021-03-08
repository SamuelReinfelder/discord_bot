const Discord = require("discord.js");
const fs = require('fs');
const yaml = require('js-yaml');
const config = require('./config.json');
const cron = require('node-cron');
const { exec } = require("child_process");
let sendAmdStatus = false;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const client = new Discord.Client();
client.commands = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(config.token);

cron.schedule('* * * * *', () => {
	amdAvailable();
});

client.once('ready', () => {

	client.user.setStatus('invisible');
	client.user.setUsername("Bot (!help)");

	client.guilds.cache.forEach((guild) => {
		let data = {
			type: "Data from status discord bot",
			member: {}
		};
		data.name = guild.name;
		data.id = guild.id;
		const channels = guild.channels.cache.filter(c => c.type === 'voice');

		for (const [channelID, channel] of channels) {
			for (const [memberID, member] of channel.members) {
				data["member"][memberID] = {
					"name": member.user.username,
					"mute": guild.voiceStates.cache.get(memberID).selfMute,
					"deaf": guild.voiceStates.cache.get(memberID).selfDeaf
				};
			}
		}
		writeData(data, guild.id);
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

	writeData(data, oldMember.guild.id);

});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, client, config);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	message.delete();
});

function writeData(data, id) {
	var dir = './server';

	if (!fs.existsSync(dir)) {
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

function amdAvailable() {
	const child = exec("tac /home/samuel/testdata | grep -m 1 .", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		output = stdout.split(";");

		if (output[2] == "Out of Stock"){
			sendAmdStatus = false;
			return;
		}

		if (!sendAmdStatus) {
			let m = output[0] + " für " + output[1] + " auf " + "https://www.amd.com/de/direct-buy/de verfügbar!!";  
			client.channels.cache.find(c => c.id == "399168874777542659").send(m);
			sendAmdStatus = true;
		}
	});
}