import inquirer from "inquirer";
import startPrompt from "./menu.js";
import compressPDF from "../services/compressPDF.js";
import chalk from "chalk";
import ora from "ora";

const handleSubCompress = async () => {
  const subCompressQuestions = [
    {
      type: "list",
      name: "subCompress",
      message: "Choose a specific compress PDF quality",
      choices: [
        { name: "📉 Low Quality", value: "lowQuality" },
        { name: "⚖️  Medium Quality", value: "mediumQuality" },
        { name: "🖨️  Good Quality", value: "goodQuality" },
        { name: "🏡 Back To Main Menu", value: "backMainMenu" },
      ],
    },
  ];

  const answer = await inquirer.prompt(subCompressQuestions);
  switch (answer.subCompress) {
    case "lowQuality":
      await loadingProcess("screen");
      break;
    case "mediumQuality":
      await loadingProcess("ebook");
      break;
    case "goodQuality":
      await loadingProcess("printer");
      break;
    case "backMainMenu":
      await startPrompt();
      break;
  }
};

const loadingProcess = async (qualityCompress) => {
  const compressSpinner = ora("Compressing pdf files ...\n").start();
  const runCompressPDF = await compressPDF(qualityCompress);
  if (runCompressPDF === "success compress") {
    const successMessage = chalk.whiteBright.bgGreen("✅ Compression Completed!");
    const outputPath = chalk.whiteBright.italic("output/compressed_result/");
    const savedMessage = chalk.whiteBright.bgGreen("📁 File saved in " + outputPath);
    compressSpinner.succeed(successMessage + "\n  " + savedMessage);
  }
  await startPrompt();
};

export default handleSubCompress;
