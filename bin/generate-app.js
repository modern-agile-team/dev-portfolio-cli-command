#! /usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import chalk from "chalk";

const projectName = process.argv[2] || "dev-portfolio";
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = "https://github.com/modern-agile-team/create-dev-portfolio.git";

const logger = {
  /**
   *
   * @param {*} color bgGreenBright | bgYellowBright | bgBlueBright
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
if (projectName !== ".") {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === "EEXIST") {
      logger.error(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
      logger.error(err);
    }
    process.exit(1);
  }
}

const requiredDependencies = [];

const checkIsDependencyExist = (system) => {
  try {
    execSync(`which ${system}`).toString();
  } catch (err) {
    requiredDependencies.push(system);
  }
};

async function main() {
  try {
    checkIsDependencyExist("docker");
    checkIsDependencyExist("docker-compose");
    checkIsDependencyExist("node");
    checkIsDependencyExist("npm");
    checkIsDependencyExist("bash");

    logger.tagging("info", "Cloning dev-portfolio...");
    execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`); // 우리의 보일러 플레이트를 clone!

    if (projectName !== ".") {
      process.chdir(`${projectPath}`); // cd입니다 clone을 마친 후 projectPath로 진입
    }

    logger.tagging("info", "Installing dependencies...");
    execSync("npm run bootstrap"); // package.json에 있는 의존성 설치

    // 이제 보일러플레이트 git과 관련된 내용 제거
    logger.tagging("info", "Removing useless files...");
    execSync("npx rimraf ./.git");
    execSync("npx rimraf ./client/.github");

    if (requiredDependencies.length > 0) {
      logger.tagging("required", "Required dependencies below\n");
      for (const dependency of requiredDependencies) {
        logger.warn(`${dependency} is required\n`);
      }
    } else {
      logger.log("bgGreenBright", "The installation is done, this is ready to use!\n");
      logger.log("bgGreenBright", "Start dev-portfilio by typing the following command in your terminal!\n");
      logger.log("bgYellowBright", "$ cd dev-portfolio or cd YOUR_APP_NAME");
      logger.log("bgYellowBright", "$ npm run start:all\n");
    }
  } catch (error) {
    logger.error(error);
  }
}

main();
