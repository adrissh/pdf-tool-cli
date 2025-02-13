import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import handleSubConvert from "./convertMenu.js";
import { headerMenu } from "./headerMenu.js";
import { mergePDFs } from "../services/mergerPDF.js";
import splitPDF from "../services/splitPDF.js";
import handleSubCompress from "../cli/compressMenu.js";

const title = chalk.bold.green("🟢🟢 CHOOSE YOURE OPTION 🟢🟢");
const mainMenuQuestions = [
  {
    type: "list",
    name: "mainMenu",
    message: title,
    choices: [
      { name: "🔗 Merge PDF Files", value: "merge" },
      { name: "📦 Compress PDF Files", value: "compress" },
      { name: "🔄 Convert PDF ➜ images files (png,jpeg,bmp,tiff)", value: "convert" },
      { name: "🔪 Split PDF files", value: "split" },
      { name: "🧹 Clear Screen", value: "clear" },
      { name: "❌ Exit", value: "exit" },
    ],
  },
];

const startPrompt = async () => {
  await headerMenu();
  const answer = await inquirer.prompt(mainMenuQuestions);
  await proccessOperation(answer.mainMenu);
};

const proccessOperation = async (operation) => {
  switch (operation) {
    case "merge":
      const mergeSpinner = ora("Mergering pdf files ...\n").start();
      const proccess = await mergePDFs();
      if (proccess === "merge successful") {
        const successMessage = chalk.whiteBright.bgGreen("✅ Merging Completed!");
        const outputPath = chalk.whiteBright.italic("output/merged_result/");
        const savedMessage = chalk.whiteBright.bgGreen("📁 File saved in " + outputPath);
        mergeSpinner.succeed(successMessage + "\n  " + savedMessage);
      }
      startPrompt();
      break;
    case "compress":
      await handleSubCompress();
      break;
    case "convert":
      await handleSubConvert();
      break;
    case "split":
      const splitSpinner = ora("Spliting pdf files ...").start();
      const runSplitPDF = await splitPDF();
      if (runSplitPDF === "split success") {
        const successMessage = chalk.whiteBright.bgGreen("✅ Splitting Completed!");
        const outputPath = chalk.whiteBright.italic("'output/split_result/'");
        const savedMessage = chalk.whiteBright.bgGreen("📁 File saved in " + outputPath);
        splitSpinner.succeed(successMessage + "\n  " + savedMessage);
      }
      startPrompt();
      break;
    case "clear":
      console.clear();
      startPrompt();
      break;
    case "exit":
      process.exit;
      console.log(chalk.bold.red("Exiting the Programm..."));
      break;
  }
};

export default startPrompt;
