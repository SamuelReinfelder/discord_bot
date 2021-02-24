module.exports = {
    name: 'valheim',
    description: 'Valheim server ip.',
    execute(message, args, client, config) {

        let url = "http://ip-api.com/json/" + config.valheim;

        fetch(url)
            .then(response => response.json())
            .then(data =>
                message.channel.send(data.query).then(msg => {
                    msg.delete({ timeout: 10000 });
                }));
    },
};