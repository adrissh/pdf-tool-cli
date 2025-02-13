import inquirer from "inquirer";
import startPrompt from "./menu.js";
import convertPDF from "../services/convertPDF.js";
import chalk from "chalk";
import ora from "ora";

const handleSubConvert = async () => {
  const subConvertQuestions = [
    {
      type: "list",
      name: "subConvert",
      message: "Choose a specific format to convert",
      choices: [
        { name: "📝 PDF --> png", value: "pdf_png" },
        { name: "📝 PDF --> jpeg", value: "pdf_jpeg" },
        { name: "📝 PDF --> bmp", value: "pdf_bmp" },
        { name: "📝 PDF --> tiff", value: "pdf_tiff" },
        { name: "🏠 Back To Main Menu", value: "backMainMenu" },
      ],
    },
  ];

  const answer = await inquirer.prompt(subConvertQuestions);
  switch (answer.subConvert) {
    case "pdf_png":
      await processingConvert("png");
      break;
    case "pdf_jpeg":
      await processingConvert("jpeg");
      break;
    case "pdf_bmp":
      await processingConvert("bmp");
      break;
    case "pdf_tiff":
      await processingConvert("tiff24nc");
      break;
    case "backMainMenu":
      await startPrompt();
      break;
  }
};

const processingConvert = async (fileType) => {
  const convertSpinner = ora("processing convert pdf files ...").start();
  const runCompressPDF = await convertPDF(fileType);
  if (runCompressPDF === "success convert") {
    const successMessage = chalk.whiteBright.bgGreen("✅ Conversion Successful!");
    const outputPath = chalk.whiteBright.italic("output/convert_result/");
    const savedMessage = chalk.whiteBright.bgGreen("📁 File saved in " + outputPath);
    convertSpinner.succeed(successMessage + "\n  " + savedMessage);
  }
  await startPrompt();
};

export default handleSubConvert;
