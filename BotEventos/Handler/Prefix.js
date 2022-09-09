const client = require("../../index");
const dc = require("discord.js");
const app = require('../../app.json');
const db = require('quick.db');

client.on(`messageCreate`, async (message) => { //Créditos Ferinha. 

    let prefix =  db.get(`prefixo-${message.guild.id}`) || app.bot.prefixo;
  
    if(message.author.bot) return;
    if(message.channel.type === 1) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    if(message.content === prefix) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
    let cmd = args.shift().toLowerCase()

    if(cmd.length === 0) return;

    let Pcomando = client.commands.get(cmd)

    if(!Pcomando) Pcomando = client.commands.get(client.aliases.get(cmd)) 
    
  try {

      Pcomando.run(client, message, args, app);

  } catch (e) { 
    
    console.log(e)

    const e1 = new dc.EmbedBuilder()
    .setDescription(`${app.emoji.nao} Não foi encontrado nenhum comando com o nome: \`${cmd}\`.`)
    .setColor(app.bot.color)

    message.reply({ embeds: [e1] })
  }

});