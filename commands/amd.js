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
      output = stdout;
      message.channel.send(output).then(
        msg => {
          msg.delete({ timeout: 10000 });
        }
      )
    });
  },

};