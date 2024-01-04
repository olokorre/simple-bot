const chalk = require('chalk');

const GREEN = "#17750b";
const RED = "#ff0000";

class Log {

    print(color, message) {
        const enconded = chalk.hex(color).bold(message);
        console.log(enconded);
    }

    info(message) {
        this.print(GREEN, message);
    }

    error(message) {
        this.print(RED, message);
    }

}

const log = new Log();

module.exports = log;
