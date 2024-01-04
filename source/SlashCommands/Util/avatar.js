const dc = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Comando para ver o avatar de um user.",
    options: [{ name: 'user', type: 6, description: 'Coloque o usuário para ver o avatar.', require: false }],
    
    run: async (client, interaction, app) => {

      await interaction.deferReply();

      let user = interaction.options.getUser('user') || interaction.user;

      const avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })

      const buttonav = new dc.ButtonBuilder()
      .setEmoji("🌐")
      .setLabel("Link")
      .setStyle(5)
      .setURL(avatar);

      const b = new dc.ActionRowBuilder().addComponents(buttonav);

       const e = new dc.EmbedBuilder()
        .setTitle(`🖼 Avatar`)
        .setDescription(`${user.username}`)
        .setColor(app.bot.color)
        .setImage(avatar)

      interaction.editReply({ embeds: [e], components: [b] })
      
}};