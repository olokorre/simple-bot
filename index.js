const dc = require('discord.js');

const client = new dc.Client({ intents: 3276799, partials: [dc.Partials.Channel, dc.Partials.User, dc.Partials.Message] });

module.exports = client;

client.slashCommands = new dc.Collection();
client.commands = new dc.Collection();
client.aliases = new dc.Collection();

// Requires
require('./handler')(client);
require('dotenv').config();
const app = require('./app.json');
const chalk = require('chalk');

//Médoto de login do bot, tanto no .env tanto no .json
client.login(process.env.DISCORD_TOKEN || app.bot.token_bot);

//Anticrash para o bot não desligar caso haja um erro.
process.on('uncaughtException', async (error, origin) => {
    console.log(chalk.hex('#ff0000').bold(`❗ ${error}\n\n[${origin}]`))
});

process.on('unhandRejection', async (reason, promise) => {
    console.log(chalk.hex('#ff0000').bold(`❗ ${reason}\n\n[${promise}]`))
});
