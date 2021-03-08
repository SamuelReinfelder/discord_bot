module.exports = {
  name: 'amd',
  description: 'Get amd ryzen 5900X.',
  execute(message, args, client, config) {

    const { exec } = require("child_process");
    let output = "";

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
      let m = "";
      if (output[2] == "Out of Stock") {
        m = output[0] + " aktuell nicht verfügbar.";
      }
      else {
        m = output[0] + " für " + output[1] + " auf " + "https://www.amd.com/de/direct-buy/de verfügbar!!";
      }

      message.channel.send(m).then(
        msg => {
          msg.delete({ timeout: 10000 });
        }
      )
    });
  },

};