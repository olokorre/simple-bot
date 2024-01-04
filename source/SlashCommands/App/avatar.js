const dc = require("discord.js");

module.exports = {
    name: 'Ver Avatar',
    type: 2,
    run: async (client, interaction, app) => {

        let member = await interaction.guild.members.fetch(interaction.targetId);
        let user = member.user;

        let AvatarPorBalah = user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 })
        let SavatarPorBalah = member.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }) //Avatar do servidor.

        const e = new dc.EmbedBuilder()
        .setTitle(`🖼 Avatar`)
        .setDescription(`${user.username}`)
        .setImage(AvatarPorBalah)
        .setColor(app.bot.color)
        .setFooter({text: `Autor: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})

        let AvatarPorBalahButton = new dc.ButtonBuilder()
        .setLabel(`Abrir no navegador`)
        .setEmoji(`🔗`)
        .setStyle(5)
        .setURL(AvatarPorBalah)

        const b = new dc.ActionRowBuilder().addComponents(AvatarPorBalahButton)

        interaction.reply({embeds: [e], components: [b], ephemeral: true})
        
}};
