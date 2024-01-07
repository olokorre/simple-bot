import { readdir, readdirSync } from "fs";
import app from '../../app.js';
import log from "../infra/Log";

export default async (client) => {

  //Puxando os comandos em slash!
  const ArgsScommands = [];

  readdir(`./source/SlashCommands/`, (err, fol) => {
    fol.forEach(subfol => {
      readdir(`./source/SlashCommands/${subfol}/`, (er, files) => {
        files.forEach(command => {
          if (!command?.endsWith('.js')) return;
          command = require(`../SlashCommands/${subfol}/${command}`);
          if (!command?.name) return;
          client.slashCommands.set(command?.name, command);
          ArgsScommands.push(command);
        });
      });
    });
  });

  //Carregando os app.slash.
  client.on("ready", async () => {
    //Carregando em 1 servidor.
    if (app.slash.guild_id) {
      const server = client.guilds.cache.get(app.slash.guild_id);
      if (!server) {
        log.error(`(Slash) > Servidor de carregamento inválido.`);
        process.exit();
      }
      try {
        server.commands.set(ArgsScommands);
        log.info(`(Slash) > Os comandos foram carregados em ${server.name}.`);
      } catch (e) {
        log.error(`(Slash) > Não foi possível carregar os comandos em ${server.name}.`);
        process.exit();
      }
    } else {
      //Carregando no global.
      try {
        client.application.commands.set(ArgsScommands);
        log.info(`(Slash) > Os comandos foram carregados globalmente.`);
      } catch (e) {
        log.error(`(Slash) > Não foi possível carregar os comandos globalmente.`);
        process.exit();
      }
    }
  });

  //Carregando prefixo.
  readdirSync('./source/PrefixCommands/').forEach(subfol => {
    const comandos = readdirSync(`./source/PrefixCommands/${subfol}`).filter(arqv => arqv.endsWith(`.js`))
    for (let command of comandos) {
      let puxar = require(`../PrefixCommands/${subfol}/${command}`);
      if (puxar.name)
        client.commands.set(puxar.name, puxar);
      if (puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(ali => client.aliases.set(ali, puxar.name));
    }

  });

  //Carregando os eventos.
  readdir(`./source/BotEventos/`, (err, fol) => {
    fol.forEach(subfol => {
      readdir(`./source/BotEventos/${subfol}/`, (er, files) => {
        files.forEach(evnt => {
          if (!evnt.endsWith('.js')) return;
          const e = require(`../BotEventos/${subfol}/${evnt}`);
          if (e.once) {
            client.once(e.name, (...args) => e.execute(client, ...args));
          } else {
            client.on(e.name, (...args) => e.execute(client, ...args));
          }
        });
      });
    });
    log.info(`(Eventos) > Eventos carregados.`);
  });
}
