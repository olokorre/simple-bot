const client = require("../../../index");
const dc = require("discord.js");
const app = require('../../../app.json');
const db = require('quick.db');

client.on(`messageCreate`, async(msg) => {

  if(!msg.guild) return;
  if(msg.author.bot) return;
  
  if(msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}>`)) {
  
  const buttonmention = new dc.ButtonBuilder()
  .setLabel(`Invite`)
  .setStyle(5)
  .setEmoji(`🔗`)
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`)

  const b = new dc.ActionRowBuilder()
  .addComponents(buttonmention);

  const e = new dc.EmbedBuilder()
  .setDescription(`**Olá ${msg.author}, obrigado por me utilizar!**\n*Use \`${db.get(`prefixo-${msg.guild.id}`) || app.bot.prefixo}help\` ou \`/help\` para mais ajuda.*`)
  .setColor(app.bot.color)

   msg.reply({ embeds: [e], components: [b] })

}

});
