module.exports = {
    name: 'restart',
    description: 'Restart Bot.',
    execute(message, args, client, config) {
        let isBotOwner = message.author.id == config.admin_id;
        if (!isBotOwner)
            return;
        message.channel.send('Restarting...')
        .then(client.destroy())
        .then(client.login(config.token))
        .then(message.channel.send('Restarted!'))
        ;
    },
};