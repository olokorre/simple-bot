import Avatar from "../commands/Avatar";
import Command from "../commands/Command";
import Ping from "../commands/Ping"
import DiscordClient from "./DiscordClitent"
import log from "./Log";

export default class Router {

    private commands: Command[];

    constructor(private client: DiscordClient) {
        this.commands = [
            new Ping(),
            new Avatar()
        ];
    }

    init(): void {
        try {
            for (const command of this.commands) {
                this.client.slashCommands.set(command.name, command);
                this.client.commands.set(command.name, command);
            }
            this.client.application?.commands.set(this.commands);
        } catch ($error) {
            let message
            if ($error instanceof Error) message = $error.message
            else message = String($error)
            log.error(message);
        }
    }

}
