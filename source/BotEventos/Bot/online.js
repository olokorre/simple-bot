const client = require("../../../index").default;
const chalk = require('chalk');

const useActivity = process.env.USE_ACTIVITY.toUpperCase() === "TRUE";

client.on("ready", async () => {
	if (!useActivity) return;
	const atividade = [{ name: "Não sei o que colocar.", type: 0 }, { name: "Também não sei o que colocar.", type: 3 }, { name: "Dev: balah7  💔", type: 2 }];
	const status = ["online", "idle", "dnd"];
	let random1 = 0;
	setInterval(() => {
		if (random1 >= atividade.length) random1 = 0;
		client.user.setActivity(atividade[random1]);
		random1++;
	}, 10000);

	let random2 = 0;
	setInterval(() => {
		if (random2 >= atividade.length) random2 = 0;
		client.user.setStatus(status[random2]);
		random2++;
	}, 25000);
	console.log(chalk.hex("#07ff03").bold(`(Bot) > Código conectado em ${client.user.tag}.`));
	console.log(chalk.hex("#0c02cc").bold(`(Bot Status)\n> ${client.guilds.cache.size} Servidores.\n> ${client.channels.cache.size} Canais.\n> ${client.users.cache.size} Usuários.`));
});
