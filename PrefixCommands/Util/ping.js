const dc = require('discord.js');

module.exports = {
  name: "ping",
  aliases: ['p'],

  run: async (client, message, args, app) => {

  const e = new dc.EmbedBuilder()
  .setTitle(`🌐 Ping`)
  .setDescription(`Ping Atual: \`${client.ws.ping}\` ms\nAtividade: <t:${parseInt((Date.now() - client.uptime) / 1000)}:R>`)
  .setColor(app.bot.color)

  message.reply({ embeds: [e] })

}};