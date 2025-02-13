import fs from "fs";
import path, { dirname } from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import util from "util";

// Mendapatkan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execPromise = util.promisify(exec);

const currentTime = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate() + 1).toString().padStart(2, "0");
  const minutes = date.getMinutes();
  const seconda = date.getSeconds();
  const uniqueString = year + month + day + minutes + "_" + seconda;
  return uniqueString;
};

const merger = async (inputFiles, outputFile) => {
  let messageMerger;
  try {
    const gsCommand = `gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -sOutputFile="${outputFile}" ${inputFiles}`;
    const { stderr } = await execPromise(gsCommand);
    if (stderr) {
      console.error(`Error when compressing PDF :, ${stderr}`);
      messageMerger = "merge error";
    }
    messageMerger = "merge successful";
    return messageMerger;
  } catch (err) {
    console.log(`error when merge files : ${err}`);
  }
};

const mergePDFs = async () => {
  const uniquePrefix = await currentTime();
  const files = fs.readdirSync(path.join(__dirname, "..", "..", "input"));
  const outputPath = path.join(__dirname, "..", "..", "output", "merged_result");
  const resultFilePath = path.join(__dirname, "..", "..", "output", "merged_result", `${uniquePrefix}_joined.pdf`);
  try {
    await fs.mkdirSync(outputPath, { recursive: true }); // create merged_result folder
    let inputFilesIteration = "";
    for (const file of files) {
      const inputFiles = path.join(__dirname, "..", "..", "input") + `/${file}`;
      inputFilesIteration += `"${inputFiles}"` + " ";
    }
    const processing =  await merger(inputFilesIteration, resultFilePath);
    return processing
  } catch (err) {
    console.log(err);
  }
};


// mergePDFs()

export {mergePDFs,merger,currentTime}

// const mergePDFs = async () => {
//   try {
//     let messageMerger;
// const dateNow = await now();
// const files = fs.readdirSync(path.join(__dirname, "..", "..", "input"));
// const outputPath = path.join(__dirname, "..", "..", "output", "merged_result");

//     if (!fs.existsSync(outputPath)) {
//       fs.mkdirSync(outputPath, { recursive: true });
//       console.log("created folder path...");
//     }

// let filesJoined = "";
// for (const file of files) {
//   const inputFiles = path.join(__dirname, "..", "..", "input") + `/${file}`;
//   filesJoined += `"${inputFiles}"` + " ";
// }
//     const fileOutput = path.join(__dirname, "..", "..", "output", "merged_result", `${dateNow}_joined.pdf`);
//     const gsCommand = `gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -sOutputFile="${fileOutput}" ${filesJoined}`;
//     const { stderr } = await execPromise(gsCommand);
//     if (stderr) {
//       console.error(`Error when compressing PDF :, ${stderr}`);
//       messageMerger = "merge error";
//     }
//     messageMerger = "merge successful";
//     return messageMerger;
//   } catch (err) {
//     console.log(err);
//   }
// };

// mergePDFs();
