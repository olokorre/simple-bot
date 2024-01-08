import { ActionRowBuilder, AutocompleteInteraction, ButtonBuilder, CommandInteraction, EmbedBuilder, Interaction } from "discord.js";
import DiscordClient from "../infra/DiscordClitent";
import Command from "./Command";
import { App } from "../../app";
import Option from "./Option";

export default class Avatar implements Command {
    
    readonly name: string;
    readonly aliases: string[];
    readonly type: number;
    readonly description: string;
    readonly options: Option[];

    constructor() {
        this.name = "avatar";
        this.aliases = [];
        this.description = "Comando para ver o avatar de um user.";
        this.type = 1;
        this.options = [{ name: 'user', type: 6, description: 'Coloque o usuário para ver o avatar.', require: false }];
    }
    
    async run(client: DiscordClient, interaction: Interaction, app: App): Promise<void> {
        if (!(interaction instanceof CommandInteraction)) return;
        await interaction.deferReply();
        const user = interaction.options.getUser('user') || interaction.user; // @ts-ignore
        const avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
        const buttonav = new ButtonBuilder()
            .setEmoji("🌐")
            .setLabel("Link")
            .setStyle(5)
            .setURL(avatar);
        const b = new ActionRowBuilder().addComponents(buttonav);
        const e = new EmbedBuilder()
            .setTitle(`🖼 Avatar`)
            .setDescription(`${user.username}`)
            .setColor(app.bot.color)
            .setImage(avatar); // @ts-ignore
        interaction.editReply({ embeds: [e], components: [b] });
    }

}
