const dc = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "panda",
    aliases: ["pan"],

    run: async (client, message, args, app) => {

    fetch(`https://some-random-api.ml/animal/panda`).then(response => response.json()).then(async(pan) => {

    const e = new dc.EmbedBuilder()
     .setTitle(`🐼 Panda`)
     .setDescription(`[Que panda fofo](${pan.image}).`)
     .setImage(pan.image)
     .setColor(app.bot.color)


  message.reply({ embeds: [e] })

})

}};