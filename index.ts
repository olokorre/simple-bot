import app from './app.js';
import log from './source/infra/Log.js';
import DiscordClient from './source/infra/DiscordClitent.js';
import { Partials } from 'discord.js';

const client = new DiscordClient({ intents: 3276799, partials: [Partials.Channel, Partials.User, Partials.Message] });

export default client;

// Requires
// Requires
require('./source/handler').default(client);
require('dotenv').config();

//Médoto de login do bot, tanto no .env tanto no .json
client.login(process.env.DISCORD_TOKEN || app.bot.token_bot);

//Anticrash para o bot não desligar caso haja um erro.
process.on('uncaughtException', async (error, origin) => {
    log.error(`❗ ${error}\n\n[${origin}]`);
});

process.on('unhandRejection', async (reason, promise) => {
    log.error(`❗ ${reason}\n\n[${promise}]`);
});
