import chalk from "chalk";
import ora from "ora";
import mergePDFs from "./modules/mergerPDF.js";
import compressPDF from "./modules/compressPDF.js";
import inquirer from "inquirer";

console.log(chalk.bold.blue("!--------------------------------------------------!"));
console.log(chalk.bold.bgBlue("                                                 "));
console.log(chalk.bold.bgBlue("               📚 SAN-PDF-Tool 📚                "));
console.log(chalk.bold.bgBlue("                                                 "));
console.log(chalk.green("                Created by me                   "));
console.log(chalk.bold.blue("!--------------------------------------------------!"));

const askQuestions = async () => {
  const title = chalk.bold.green("🟢🟢 CHOOSE YOURE OPTION 🟢🟢")
  const questions = [
    {
      type: "list",
      name: "operation",
      message: title,
      choices: [
        { name: "🔗 Merge PDF Files", value: "merge" },
        { name: "📦 Compress PDF Files", value: "compress" },
        { name: "🔄 Convert PDF to images files (jpg ,png ,jpeg)", value: "convert" },
        { name: "🔪 Split PDF files", value: "split" },
        { name: "🧹 Clear Screen", value: "clear" },
        { name: "❌ Exit", value: "exit" },
      ],
    },
    {
      type: "list",
      name: "subOperation",
      message: "choose specific convert",
      choices: [
        { name: "PDF to JPEG", value: "pdf_jpeg" },
        { name: "PDF to PNG", value: "pdf_png" },
        { name: "PDF to BMP", value: "pdf_bpm" },
        { name: "🔙 Back to main menu", value: "main_menu" },
      ],
      when: (answer) => answer.operation === "convert", //
    },
  ];

  // using inquirer.prompt to show questions
  // console.clear()
  // process.stdout.write('\x1Bc');
  const answer = await inquirer.prompt(questions);
  return answer;
};

const processOperation = async (operation) => {
  switch (operation) {
    case "merge":
      const mergeSpinner = ora("Mergering pdf files ...\n").start();
      const proccess = await mergePDFs();
      if (proccess === "success") {
        const message = chalk.green("operation to merge PDF files has been completed !");
        mergeSpinner.succeed(message);
      }
      break;
    case "compress":
      const compressSpinner = ora("Compressing pdf files ...").start();
      const runCompressPDF = await compressPDF();
      if (runCompressPDF === "success compress") {
        // compressSpinner.succeed(chalk.green("Compress Sucessfully !!!"))
        compressSpinner.succeed(chalk.green("Compression Successful !!!"));
      }
      break;
    case "convert":
      console.log("processing convert PDF files");
      break;
    case "clear":
      console.clear();
      break;
    case "exit":
      console.log(chalk.bold.red("Exiting the application..."));
      return true;
    default:
      console.log("Invalid option");
  }
  return false;
};

const main = async () => {
  let exit = false;
  while (!exit) {
    const operationType = await askQuestions();
    exit = await processOperation(operationType.operation);
  }
};
main();
