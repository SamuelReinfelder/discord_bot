Server install

* git clone https://github.com/SamuelReinfelder/discord_bot.git
* In Order wechseln und "npm install" ausführen
* curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
* sudo apt-get install nodejs
* npm install pm2 -g
* config.json.sample kopieren zu config.json
* Token in config.json anpassen
* pm2 start index.js
* pm2 startup
* pm2 save
