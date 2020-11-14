module.exports = {
    name: 'help',
    description: 'List Bot commands.',
    execute(message, args, client, token) {

        let commands = client.commands;
        let names = "";
        commands.forEach(c => {
            names = names + "!" + c.name + "\n";
        });

        let info = "Es stehen folgende Befehle zur Verfügung:";
        message.channel.send(info);

        message.channel.send(names);
    },
};