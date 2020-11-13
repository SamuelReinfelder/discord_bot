module.exports = {
    name: 'restart',
    description: 'Restart Bot.',
    execute(message, args, client, token) {
        let isBotOwner = message.author.id == '261917772362153984';
        if (!isBotOwner)
            return;
        message.channel.send('Restarting...')
        .then(client.destroy())
        .then(client.login(token))
        .then(message.channel.send('Restarted!'))
        ;
    },
};