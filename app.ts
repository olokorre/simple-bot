import { ColorResolvable } from "discord.js";

interface Bot {
    prefixo: string;
    color: ColorResolvable,
    token_bot: string;
    dev_id: string;
}

interface Slash {
    guild_id: string;
}

interface Emoji {
    sim: string;
    nao: string;
}

export interface App {
    bot: Bot;
    slash: Slash;
    emoji: Emoji;
}

const app: App = {
    "bot": {
        "prefixo": ".",
        "color": "Random",
        "token_bot":"",
        "dev_id": ""
    },
    "slash": {
        "guild_id": ""
    },
    "emoji": {
        "sim": "✔",
        "nao": "❌"
    }

}

export default app;
