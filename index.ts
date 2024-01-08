import app from './app.js';
import log from './source/infra/Log.js';
import DiscordClient from './source/infra/DiscordClitent.js';
import { Partials } from 'discord.js';
import { config } from 'dotenv';
import Router from './source/infra/Router.js';

config();

const client = new DiscordClient({ intents: 3276799, partials: [Partials.Channel, Partials.User, Partials.Message] });

client.login(process.env.DISCORD_TOKEN || app.bot.token_bot);

require('./source/handler').default(client);

process.on('uncaughtException', async (error, origin) => {
    log.error(`❗ ${error}\n\n[${origin}]`);
});

process.on('unhandRejection', async (reason, promise) => {
    log.error(`❗ ${reason}\n\n[${promise}]`);
});

const router = new Router(client);
client.on("ready", function () {
    router.init();
    log.info("Comandos carregados!");
});


export default client;
