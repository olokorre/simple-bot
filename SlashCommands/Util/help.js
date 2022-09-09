const dc = require('discord.js');

module.exports = {
    name: "help",
    description: "Comando para ver o menu de ajuda com todos os meus comandos.",
    type: 1,
  
    run: async (client, interaction, app) => {

        await interaction.deferReply();

        const binicio = new dc.ButtonBuilder()
        .setLabel(`Início`)
        .setStyle(1)
        .setCustomId(`0`)
        .setEmoji(`0️⃣`)

        const butilidade = new dc.ButtonBuilder()
        .setLabel(`Utilidade`)
        .setStyle(1)
        .setCustomId(`1`)
        .setEmoji(`1️⃣`)

        const bmod = new dc.ButtonBuilder()
        .setLabel(`Moderação`)
        .setStyle(1)
        .setCustomId(`2`)
        .setEmoji(`2️⃣`)

        const bdiver = new dc.ButtonBuilder()
        .setLabel(`Diversão`)
        .setStyle(1)
        .setCustomId(`3`)
        .setEmoji(`3️⃣`)

        const b = new dc.ActionRowBuilder()
        .addComponents(binicio)
        .addComponents(butilidade)
        .addComponents(bmod)
        .addComponents(bdiver)

        const e = new dc.EmbedBuilder()
        .setTitle(`⚠ Help`)
        .setDescription(`⭐ ${interaction.member} Bem vindo ao meu painel de ajuda.\n\nUse os botões para navegar no meu menu de ajuda.`)
        .addFields({ name: `Inicio`, value: `\`0️⃣\``, inline: true},
        { name: `Utilidade`, value: `\`1️⃣\``, inline: true},
        { name: `Moderação`, value: `\`2️⃣\``, inline: true},
        { name: `Diversão`, value: `\`3️⃣\``, inline: true})
        .setColor(app.bot.color)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTimestamp(new Date())

        const i = await interaction.editReply({ embeds: [e], components: [b] })

const button = i.createMessageComponentCollector()
button.on(`collect`, async (bt) => {
    
if(bt.user.id !== interaction.member.id) {
    const ee = new dc.EmbedBuilder()
    .setDescription(`${app.emoji.nao} Somente o ${interaction.member} tem acesso a esse painel.`)
    .setColor(app.bot.color)

   return bt.reply({ embeds: [ee], ephemeral: true })
}

if(bt.customId === '0') {

    bt.update({ embeds: [e], components: [b] })

}

if(bt.customId === '1') {

    const e1 = new dc.EmbedBuilder()
    .setTitle(`1️⃣ Utilidade`)
    .setDescription(`Comandos:\n\n*** /avatar\n/botinfo\n/help\n/ping ***`)
    .setColor(app.bot.color)
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setTimestamp(new Date())

    bt.update({ embeds: [e1], components: [b] })
    
}

if(bt.customId === '2') {

    const e2 = new dc.EmbedBuilder()
    .setTitle(`2️⃣ Moderação`)
    .setDescription(`Comandos:\n\n*** /ban ***`)
    .setColor(app.bot.color)
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setTimestamp(new Date())

    bt.update({ embeds: [e2], components: [b] })
    
}

if(bt.customId === '3') {

    const e3 = new dc.EmbedBuilder()
    .setTitle(`3️⃣ Diversão`)
    .setDescription(`Comandos:\n\n*** /panda ***`)
    .setColor(app.bot.color)
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setTimestamp(new Date())

    bt.update({ embeds: [e3], components: [b] })
    
}

})

}};