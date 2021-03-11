module.exports = {
  name: 'amd',
  description: 'Get amd ryzen 5900X.',
  execute(message, args, client, config) {

    const { exec } = require("child_process");
    let output = "";

    const child = exec("mysql -se \"select * from amd.products where name like '5900X' order by id DESC LIMIT 1;\"", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      output = stdout.split("\t");
      let m = "";
      if (output[3] == "Out of Stock") {
        m = output[1] + " aktuell nicht verfügbar.";
      }
      else {
        m = output[1] + " für " + output[2] + " auf " + "https://www.amd.com/de/direct-buy/de verfügbar!!";
      }

      message.channel.send(m).then(
        msg => {
          msg.delete({ timeout: 10000 });
        }
      )
    });
  },

};