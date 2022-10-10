#! /usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const projectName = process.argv[2] || "dev-portfolio";
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = "https://github.com/modern-agile-team/create-dev-portfolio.git";

if (projectName !== ".") {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(projectName);
      console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
      console.log(err);
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
    checkIsDependencyExist("node");
    checkIsDependencyExist("npm");
    checkIsDependencyExist("bash");
    checkIsDependencyExist("docker-compose");

    console.log("Cloning dev-portfolio...");
    execSync(`git clone --recursive --depth 1 ${GIT_REPO} ${projectPath}`); // 우리의 보일러 플레이트를 clone!

    if (projectName !== ".") {
      process.chdir(`${projectPath}`); // cd입니다 clone을 마친 후 projectPath로 진입
    }

    console.log("Downloading submodules...");
    execSync(`git submodule update --init --remote --merge`); // 서브모듈 install!

    console.log("Installing dependencies...");
    execSync("npm run bootstrap"); // package.json에 있는 의존성 설치

    // 이제 보일러플레이트 git과 관련된 내용 제거
    console.log("Removing useless files...");
    execSync("npx rimraf ./.git");
    execSync("npx rimraf ./client/.github");

    if (requiredDependencies.length > 0) {
      console.log("Required dependencies below\n");
      for (const dependency of requiredDependencies) {
        console.log(`${dependency} is required\n`);
      }
    } else {
      console.log("The installation is done, this is ready to use!\n");
      console.log("Start dev-portfilio by typing 'npm run start:all' in your terminal!\n");
    }
  } catch (error) {
    console.log(error);
  }
}

main();
