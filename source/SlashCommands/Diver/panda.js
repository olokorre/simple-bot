const dc = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'panda',
  description: 'Comando para ver fotos de pandas.',
  type: 1,
  run: async (client, interaction, app) => {
    await interaction.deferReply();
    const e = new dc.EmbedBuilder()
      .setTitle(`🐼 Panda`)
      .setDescription(`Não funciona mais :)`)
      .setColor(app.bot.color);
    interaction.editReply({ embeds: [e] });
  }
};
