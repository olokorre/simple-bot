import chalk from 'chalk';

const GREEN = "#17750b";
const RED = "#ff0000";

type ColorStack = typeof GREEN | typeof RED;

class Log {

    private print(color: ColorStack, message: string) {
        const enconded = chalk.hex(color).bold(message);
        console.log(enconded);
    }

    info(message: string) {
        this.print(GREEN, message);
    }

    error(message: string) {
        this.print(RED, message);
    }

}

const log = new Log();

export default log;
