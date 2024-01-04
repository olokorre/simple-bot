const dc = require('discord.js')

module.exports = {
    name: "botinfo",
    description: 'Comando para ver as minhas informações.',
    run: async (client, interaction, app) => {
        await interaction.deferReply();
        const botcor = interaction.guild.members.cache.get(client.user.id)
        const up = Math.floor(client.uptime / 60000) % 60;
        const botbutton = new dc.ButtonBuilder()
            .setLabel(`Invite`)
            .setEmoji('📗')
            .setStyle(5)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`) //Link do invite
        const b = new dc.ActionRowBuilder().addComponents(botbutton);
        const e = new dc.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTitle(`🤖 Botinfo`)
            .setDescription(`*Veja as minhas informações abaixo!*`)
            .setColor(botcor.displayHexColor)
            .addFields(
                { name: `Developer:`, value: `Nome aqui!`, inline: true },
                { name: `Nome:`, value: `${client.user.username}`, inline: true },
                { name: `Id:`, value: `${client.user.id}`, inline: true },
                { name: `Data De Criação:`, value: `Data aqui!`, inline: true },
                { name: `Servers:`, value: `${client.guilds.cache.size}`, inline: true },
                { name: `Users:`, value: `${client.guilds.cache.size}`, inline: true },
                { name: `Channels:`, value: `${client.channels.cache.size}`, inline: true },
                { name: `Linguagem:`, value: `Linguagem aqui!`, inline: true },
                { name: `Host:`, value: `Nome aqui!`, inline: true },
                { name: `Ping:`, value: `${client.ws.ping}ms de ping`, inline: true },
                { name: `Ram:`, value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB'}`, inline: true },
                { name: `Uptime:`, value: `${up} Minutos`, inline: true })
            .setThumbnail(client.user.displayAvatarURL())
        interaction.editReply({ embeds: [e], components: [b], content: `${interaction.user}` })
    }
};
