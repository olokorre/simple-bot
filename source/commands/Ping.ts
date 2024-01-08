import Command from "./Command";
import App from "../../app";
import DiscordClient from "../infra/DiscordClitent";
import { Interaction, EmbedBuilder, AutocompleteInteraction, ColorResolvable } from "discord.js";
import Option from "./Option";

export default class Ping implements Command {
    
    readonly name: string;
    readonly aliases: string[];
    readonly type: number;
    readonly description: string;
    readonly options: Option[];

    constructor() {
        this.name = "ping";
        this.aliases = [];
        this.type = 1;
        this.description = "Comando para a minha latência atual.";
        this.options = [];
    }
    
    async run(client: DiscordClient, interaction: Interaction, app: typeof App): Promise<void> {
        if (!client.uptime) return;
        if (interaction instanceof AutocompleteInteraction) return;
        await interaction.deferReply({ ephemeral: true });
        const e = new EmbedBuilder()
            .setTitle(`🌐 Ping`)
            .setDescription(`Ping Atual: \`${client.ws.ping}\` ms\nAtividade: <t:${parseInt(((Date.now() - client.uptime) / 1000).toString())}:R>`)
            .setColor(app.bot.color);
        interaction.editReply({ embeds: [e] });
    }

}
