const dc = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Comando para banir um usário do servidor.',
    type: 1,
    options: [{name: 'user', type: 6, description: 'Coloque um usuário.', required: true},
    {name: 'motivo', type: 3, description:  'Coloque um motivo.', required: false, max_lenght: 150}],

    run: async (client, interaction, app) => {

    const user = interaction.options.getUser('user');
    const membro = interaction.guild.members.cache.get(user.id);
    const motivo = interaction.options.getString('motivo') || 'Não Informado.';

    if(!interaction.guild.members.me.permissions.has(dc.PermissionsBitField.Flags.BanMembers)) { //Permissão do bot.

        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Eu não possuo permissão de banir membros.`)
        .setColor(app.bot.color)
       
        return interaction.reply({ embeds: [e], ephemeral: true }) 

    }

    if(!interaction.member.permissions.has(dc.PermissionsBitField.Flags.BanMembers)) { //Permissão do membro.
       
        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Você não possui permissão de banir membros.`)
        .setColor(app.bot.color)
       
        return interaction.reply({ embeds: [e], ephemeral: true }) 
    }

    if (interaction.user.id === user.id) { 
        
        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Não sei se te falei, mas você não pode se banir.`)
        .setColor(app.bot.color)
       
        return interaction.reply({ embeds: [e], ephemeral: true }) 

    }

    if (client.user.id === user.id) { 
        
        const e = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Não sei se te falei, mas você não pode me banir.`)
        .setColor(app.bot.color)
       
        return interaction.reply({ embeds: [e], ephemeral: true }) 

    }

    await interaction.deferReply();

    const e1 = new dc.EmbedBuilder()
    .setTitle(`🛑 Ban`)
    .setDescription(`Um novo usuário foi banido.`)
    .addFields({ name: `Autor`, value: `${interaction.member}`, inline: true },
    { name: `Membro`, value: `${user}`, inline: true },
    { name: `Motivo`, value: `**${motivo}**`, inline: false },)

    interaction.editReply({ embeds: [e1] })

    interaction.guild.members.ban(membro, { reason: motivo }).catch(e => {
        
        const e2 = new dc.EmbedBuilder()
        .setDescription(`${app.emoji.nao} Não possível realizar o banimento de ${user}.`)
        .setColor(app.bot.color)

        interaction.editReply({ embeds:  [e2]}).then(()=>{ setTimeout(() => { interaction.deleteReply() }, 6000) })
        console.log(e)
    })

}};
