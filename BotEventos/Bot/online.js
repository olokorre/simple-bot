const client = require("../../index");
const dc = require('discord.js');
const chalk = require('chalk');
const app = require('../../app.json');

client.on(`ready`, async() => {

  //Atividade & Status.
	const atividade = [{name: `Não sei o que colocar.`, type: 0}, {name: `Também não sei o que colocar.`, type: 3}, {name: `Dev: balah7  💔`, type: 2}]; //Mudar "name" para o seu status. Caso queira mais types: https://discord-api-types.dev/api/discord-api-types-v9/enum/ActivityType
	const status = [`online`, `idle`, `dnd`]; //online 🟢, idle 🟡, dnd 🔴, invisible ⚫.

	let random1 = 0;

	setInterval(() => {
		if(random1 >= atividade.length) random1 = 0

		client.user.setActivity(atividade[random1])

		random1++ }, 10000) //Tempo em MS

	let random2 = 0;

	setInterval(() => {
		if(random2 >= atividade.length) random2 = 0

		client.user.setStatus(status[random2])

		random2++ }, 25000) //tempo em MS

    //Bot online.

    console.log(chalk.hex(`#07ff03`).bold(`(Bot) > Código conectado em ${client.user.tag}.`))
    console.log(chalk.hex(`#0c02cc`).bold(`(Bot Status)\n> ${client.guilds.cache.size} Servidores.\n> ${client.channels.cache.size} Canais.\n> ${client.users.cache.size} Usuários.`))

});