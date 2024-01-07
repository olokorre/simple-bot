import { Client, ClientOptions, Collection } from "discord.js";

export default class DiscordClient extends Client {

    public slashCommands: Collection<string, any>;
    public commands: Collection<string, any>;
    public aliases: Collection<string, any>;

    constructor(options: ClientOptions) {
        super(options);
        this.slashCommands = new Collection();
        this.commands = new Collection();
        this.aliases = new Collection();
    }

}
