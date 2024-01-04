const dc = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'panda',
    description: 'Comando para ver fotos de pandas.',
    type: 1,

    run: async (client, interaction, app) => {

    await interaction.deferReply();

    fetch(`https://some-random-api.ml/animal/panda`).then(response => response.json()).then(async(pan) => {

    const e = new dc.EmbedBuilder()
     .setTitle(`🐼 Panda`)
     .setDescription(`[Que panda fofo](${pan.image}).`)
     .setImage(pan.image)
     .setColor(app.bot.color)


  interaction.editReply({ embeds: [e] })

})

}};