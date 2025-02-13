import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import util from "util";
// Mendapatkan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execPromise = util.promisify(exec);
import { currentTime, merger } from "./mergerPDF.js";
import { PDFDocument } from "pdf-lib";

const splitPDF = async () => {
  let messageSplit;
  const uniquePrefix = await currentTime();
  const resultFilePath = path.join(__dirname, "..", "..", ".temp", `${uniquePrefix}_joined.pdf`);
  const temporaryfolder = path.join(__dirname, "..", "..", ".temp");

  try {
    //  create folder path (.temp & split_result)
    try {
      const folderPathResult = path.join(__dirname, "..", "..", "output", "split_result");
      fs.mkdirSync(folderPathResult, { recursive: true });
      fs.mkdirSync(temporaryfolder, { recursive: true });
    } catch (err) {
      console.log(`error when mkdir temporary & split_result details : ${err}`);
    }
    // merge pdf files
    try {
      const files = fs.readdirSync(path.join(__dirname, "..", "..", "input"));
      let inputFilesIteration = "";
      for (const file of files) {
        const inputFiles = path.join(__dirname, "..", "..", "input") + `/${file}`;
        inputFilesIteration += `"${inputFiles}"` + " ";
      }
      await merger(inputFilesIteration, resultFilePath);
    } catch (err) {
      console.log(`Error when mergering files , Detail : ${err}`);
    }

    const totalPages = await pdfPageCount(resultFilePath); //get total pages
    const outputFilePath = path.join(__dirname, "..", "..", "output", "split_result", `%03d_${uniquePrefix}_split.pdf`);

    const gsCommand = `gs -dQUIET -sDEVICE=pdfwrite \
    -dFirstPage=1 -dLastPage=${totalPages} \
    -dSAFER \
    -dNOPAUSE \
    -dBATCH \
    -sOutputFile='${outputFilePath}' '${resultFilePath}'`;

    const { stderr, error } = await execPromise(gsCommand);
    if (error) {
      console.log(`you have error ${error}`);
      messageSplit = "split failed";
      return messageSplit;
    }

    // Filter out known Ghostscript warnings & errors
    const filteredStderr = stderr
      .split("\n") // Split into lines
      .filter((line) => !line.includes("pdfmark destination page")) // Remove specific errors
      .filter((line) => !line.includes("Annotation destination")) // Remove annotation warnings
      .join("\n"); // Join back to string

    if (filteredStderr.trim()) {
      console.warn(`Filtered Warning: ${filteredStderr}`);
    }
   
  } catch (err) {
    console.log(`Error When Split pdf files , details : ${err}`);
  } finally {
    try {
      // remove temp folder
      fs.rmSync(temporaryfolder, { recursive: true, force: true });
      messageSplit = "split success";
      return messageSplit;
    } catch (err) {
      console.log(`failed to remove temporary folder , : ${err}`);
    }
  }
};

const pdfPageCount = async (filePath) => {
  try {
    const dataBuffer = await fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(dataBuffer);
    const pageCount = pdfDoc.getPageCount();
    return pageCount;
  } catch (err) {
    console.error(`Error When counting PDF files , Detail : ${err}`);
  }
};

export default splitPDF;
