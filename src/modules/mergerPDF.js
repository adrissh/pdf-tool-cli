import { PDFDocument } from "pdf-lib";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from "fs";

const mergePDFs = async () => {
  //   create folder path
  try {
    const folderName = "merged_result";
    const folderPath = path.join(__dirname, "..", "..", folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`created folder ${folderPath}`);
    }
  } catch (err) {
    console.log(err);
  }

  //   merger PDF files
  try {
    let messageMerger;
    const mergePDF = await PDFDocument.create();
    const filePath = path.join(__dirname, "..", "..", "input_files");
    const data = fs.readdirSync(filePath);

    for (const element of data) {
      //   console.log(`Processing: ${element}`);
      const filePathWithFileName = `${filePath}/${element}`;
      const data = fs.readFileSync(filePathWithFileName);
      const pdf = await PDFDocument.load(data); // load pdf file
      const copiesPages = await mergePDF.copyPages(pdf, pdf.getPageIndices()); // copy all page from pdf file
      copiesPages.forEach((el) => mergePDF.addPage(el));
    }
    const pdfBytes = await mergePDF.save();
    const pathFileSaved = path.join(__dirname, "..", "..", "merged_result", "joined.pdf");
    fs.writeFileSync(pathFileSaved, pdfBytes);
    messageMerger = "success";
    return messageMerger;
  } catch (err) {
    console.error(`error when mergering files ${err}`);
    messageMerger = "failed to merge PDF files";
    return messageMerger;
  }
};

export default mergePDFs;
