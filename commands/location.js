module.exports = {
    name: 'locations',
    description: 'List of warzone locations.',
    execute(message, args, client, token) {

        locations = [
            "Downtown",
            "Park",
            "Hospital",
            "TV Station",
            "Dam",
            "Military Base",
            "Quarry",
            "Lumber",
            "Stadium",
            "Port",
            "Hills",
            "Promenade East",
            "Promenade West",
            "Airport",
            "Boneyard",
            "Superstore",
            "Storage Town",
            "Prison",
            "Farmland"
        ];

        let location = locations[Math.floor(Math.random() * locations.length)];

        message.reply("Dorthin gehts: " + location);
    },
};
