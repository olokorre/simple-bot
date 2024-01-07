const client = require("../../../index").default;
const dc = require("discord.js");
const app = require('../../../app.js');

client.on(`interactionCreate`, async (interaction) => {
  const command = client.slashCommands.get(interaction.commandName);
  if (interaction.type === 4) {
    if (command.autocomplete) {
      const choices = [];
      await command.autocomplete(interaction, choices);
    }
  }
  if (!interaction.type === 2) return;
  if (interaction.channel.type === 1) return interaction.reply({ content: `${app.emoji.nao} Meus comandos só funcionam em servidores.`, ephemeral: true })
  if (!command) return client.slashCommands.delete(interaction.commandName);
  try {
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
    command.run(client, interaction, app);
  } catch (e) {
    const e1 = new dc.EmbedBuilder()
      .setDescription(`${app.emoji.nao} Não foi possível realizar este comando.`)
      .setColor(app.bot.color)
    interaction.reply({ embeds: [e1] })
  }
});
