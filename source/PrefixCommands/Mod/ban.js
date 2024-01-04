const dc = require('discord.js');

module.exports = {
    name: "ban",
    aliases: ['b'],
  
    run: async (client, message, args, app) => {

    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const motivo = args.slice(1).join(" ") || 'Não Informado.';

    if(!message.guild.members.me.permissions.has(dc.PermissionsBitField.Flags.BanMembers)) { //Permissão do bot.

        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Eu não possuo permissão de banir membros.`)
        .setColor(app.bot.color)
       
        return message.reply({ embeds: [e] }) 

    }

    if(!message.member.permissions.has(dc.PermissionsBitField.Flags.BanMembers)) { //Permissão do membro.
       
        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Você não possui permissão de banir membros.`)
        .setColor(app.bot.color)
       
        return message.reply({ embeds: [e] }) 
    }

    if(!user) {

        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Você esqueceu de mencionar um membro.`)
        .setColor(app.bot.color)
       
        return message.reply({ embeds: [e] }) 

    }

    const membro = message.guild.members.cache.get(user.id);

    if(!membro) {

        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Mencione um membro válido.`)
        .setColor(app.bot.color)
       
        return message.reply({ embeds: [e] }) 

    }

    if (message.author.id === user.id) { 
        
        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Não sei se te falei, mas você não pode se banir.`)
        .setColor(app.bot.color)
       
        return message.reply({ embeds: [e] }) 

    }

    if (client.user.id === user.id) { 
        
        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Não sei se te falei, mas você não pode me banir.`)
        .setColor(app.bot.color)
       
        return message.reply({ embeds: [e] }) 

    }

    const e1 = new dc.EmbedBuilder()
    .setTitle(`🛑 Ban`)
    .setDescription(`Um novo usuário foi banido.`)
    .addFields({ name: `Autor`, value: `${message.member}`, inline: true },
    { name: `Membro`, value: `${user}`, inline: true },
    { name: `Motivo`, value: `**${motivo}**`, inline: false },)

    let msg = await message.reply({ embeds: [e1] })

    message.guild.members.ban(membro, { reason: motivo }).catch(e => {
        
        const e2 = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Não possível realizar o banimento de ${user}.`)
        .setColor(app.bot.color)

        msg.edit({ embeds:  [e2]}).then(()=>{ setTimeout(() => { msg.delete() }, 6000) })
        console.log(e)
    })

}};
