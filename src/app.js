import chalk from "chalk";
import ora from "ora";
import mergePDFs from "./modules/mergerPDF.js";
import compressPDF from "./modules/compressPDF.js";
import splitPDF from "./modules/splitPDF.js";
import inquirer from "inquirer";

console.log(chalk.bold.blue("!--------------------------------------------------!"));
console.log(chalk.bold.bgBlue("                                                 "));
console.log(chalk.bold.bgBlue("               📚 SAN-PDF-Tool 📚                "));
console.log(chalk.bold.bgBlue("                                                 "));
console.log(chalk.green("                Created by me                   "));
console.log(chalk.bold.blue("!--------------------------------------------------!"));

const askQuestions = async () => {
  const title = chalk.bold.green("🟢🟢 CHOOSE YOURE OPTION 🟢🟢");
  const questions = [
    {
      type: "list",
      name: "operation",
      // message: title,
      message: "pilih salah satu",
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
  const answer = await inquirer.prompt(questions);
  return answer;

};

const processOperation = async (operation) => {
  switch (operation) {
    case "merge":
      const mergeSpinner = ora("Mergering pdf files ...\n").start();
      const proccess = await mergePDFs();
      if (proccess === "success") {
        const message = chalk.green("Merged PDF files has been completed ✅");
        mergeSpinner.succeed(message);
      }
      break;
    case "compress":
      const compressSpinner = ora("Compressing pdf files ...").start();
      const runCompressPDF = await compressPDF();
      if (runCompressPDF === "success compress") {
        compressSpinner.succeed(chalk.green("Compression Successfully ✅"));
      }
      break;
    case "convert":
      console.log("processing convert PDF files");
      break;
    case "split":
      const splitSpinner = ora("Spliting pdf files ...").start()
      const runSplitPDF = await splitPDF()
      if(runSplitPDF ==="split success"){
        splitSpinner.succeed(chalk.green("Spliting successfully ✅"))
      }else{
        splitSpinner.fail("Spliting failed !!!")
      }
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
    console.log(`Anda memilih: ${operationType.operation}`);
    exit = await processOperation(operationType.operation);
  }
};
main();
