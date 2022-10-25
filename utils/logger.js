import chalk from "chalk";

const logger = {
  /**
   *
   * @param {*} color bgGreenBright | bgYellowBright | bgBlueBright | yellowBright
   * @param {*} message text
   */
  log(color, message) {
    console.log(chalk[color](message));
  },
  warn(message) {
    console.log(chalk.bold.yellow("[WARN] ") + message);
  },
  error(message) {
    console.error(chalk.bold.red("[ERROR] ") + chalk.redBright(message));
  },
  tagging(tag, message) {
    console.info(chalk.bold.gray(`[${tag.toUpperCase()}] `) + chalk.cyanBright(message));
  },
};

export default logger;
