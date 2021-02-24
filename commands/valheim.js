module.exports = {
    name: 'valheim',
    description: 'Valheim server ip.',
    execute(message, args, client, config) {

        let commands = client.commands;
        let names = "";
        commands.forEach(c => {
            names = names + "__!" + c.name + "__: " + c.description + "\n";
        });

        let info = "**Es stehen folgende Befehle zur Verfügung**\n" + names;
        message.channel.send(info).then(msg => {
            msg.delete({ timeout: 10000 });
          });
    },
};