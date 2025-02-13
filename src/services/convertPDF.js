import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import util from "util";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execPromise = util.promisify(exec);

const convertPDF = async (formatFile) => {
  let messageConvert;
  const temporaryfolder = path.join(__dirname, "..", "..", ".temp");
  const folderPath = path.join(__dirname, "..", "..", "output", "convert_result");
  

  try {
    fs.mkdirSync(folderPath, { recursive: true }); // create convert_result folder
    fs.mkdirSync(temporaryfolder, { recursive: true }); // create temp folder
    //  merge pdf files before convert
    const files = fs.readdirSync(path.join(__dirname, "..", "..", "input"));
    let filesJoined = "";
    for (const file of files) {
      const inputFiles = path.join(__dirname, "..", "..", "input") + `/${file}`;
      filesJoined += `"${inputFiles}"` + " ";
    }
    const outputMerged = path.join(__dirname, "..", "..", ".temp", "merged.pdf");
    const gsCommand = `gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile="${outputMerged}" ${filesJoined}`;
    const { stderr } = await execPromise(gsCommand);
    if (stderr) {
      console.error(`Error when compressing PDF :, ${stderr}`);
    }

    // convert to images
    const uniqieString = await now();
    const resultConvert = path.join(__dirname, "..", "..", "output", `convert_result/%03d_${uniqieString}.${formatFile}`);
    const gsCommandConvert = `gs -dNOPAUSE -sDEVICE=png16m -r300 -o "${resultConvert}"  "${outputMerged}"`;
    const { stderrConvert } = await execPromise(gsCommandConvert);
    if (stderr) {
      console.error(`Error when compressing PDF :, ${stderrConvert}`);
    }
    // end convert
  } catch (err) {
    console.error(`error when convert files details : ${err}`);
  } finally {
    try {
      // remove temp folder
      fs.rmSync(temporaryfolder, { recursive: true, force: true });
      messageConvert = "success convert";
      return messageConvert;
    } catch (err) {
      console.log(`failed to remove temporary folder , : ${err}`);
    }
  }
};

const now = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate() + 1).toString().padStart(2, "0");
  const minutes = date.getMinutes();
  const seconda = date.getSeconds();
  const uniqueString = year + month + day + minutes + "_" + seconda;
  return uniqueString;
};

export default convertPDF;
