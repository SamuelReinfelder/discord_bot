module.exports = {
    name: 'valheim',
    description: 'Valheim server ip.',
    execute(message, args, client, config) {
        const fetch = require('node-fetch');
        let url = "http://ip-api.com/json/" + config.valheim;

        // fetch(url)
        //     .then(response => response.json())
        //     .then(
        //         data => message.channel.send(data.query + ":2456").then(
        //             msg => {
        //                 msg.delete({ timeout: 10000 });
        //             }
        //         )
        //     );

        message.channel.send("ladebeck.de").then(
            msg => {
                msg.delete({ timeout: 10000 });
            }
        )

    },
};