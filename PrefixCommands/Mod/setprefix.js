const dc = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "setprefix",
    aliases: ['sp'],
  
    run: async (client, message, args, app) => {

    const p = args[0];

    const e = new dc.EmbedBuilder()
    .setDescription(`${app.emoji.nao} Você se esqueceu de colocar o **prefixo**.`)
    .setColor(app.bot.color)

    if(!p) return message.reply({ embeds: [e] });

    const e1 = new dc.EmbedBuilder()
    .setDescription(`${app.emoji.nao} Prefixo muito grande, no máximo \`5\` caracteres.`)
    .setColor(app.bot.color)

    if(p.length > 5) return message.reply({ embeds: [e1] });

    const e2 = new dc.EmbedBuilder()
    .setTitle(`🔧 Setprefix`)
    .setDescription(`Meu prefixo foi alterado para: \`${p}\``)
    .setColor(app.bot.color)


    try {
        db.set(`prefixo-${message.guild.id}`, p)

        message.reply({ embeds: [e2] });

    } catch(err) {

        console.log(err)

        const e3 = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Não possível salvar este prefixo, tente novamente.`)
        .setColor(app.bot.color)

        message.reply({ embeds: [e3] });
    }
    
}};