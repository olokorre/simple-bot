import { Interaction } from "discord.js";
import DiscordClient from "../infra/DiscordClitent";
import App from "../../app";
import Option from "./Option";

export default interface Command {

    readonly name: string;
    readonly aliases: string[];
    readonly type: number;
    readonly description: string;
    readonly options: Option[];
    run(client: DiscordClient, interaction: Interaction, app: typeof App): Promise<void>;

}
