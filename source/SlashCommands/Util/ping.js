const dc = require('discord.js');

module.exports = {
  name: "ping",
  description: "Comando para a minha latência atual.",
  type: 1,

  run: async (client, interaction, app) => {

  await interaction.deferReply({ ephemeral: true })

  const e = new dc.EmbedBuilder()
  .setTitle(`🌐 Ping`)
  .setDescription(`Ping Atual: \`${client.ws.ping}\` ms\nAtividade: <t:${parseInt((Date.now() - client.uptime) / 1000)}:R>`)
  .setColor(app.bot.color)

  interaction.editReply({ embeds: [e] })

}};