import fs from "fs";
import path  from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import util from "util";

// Mendapatkan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mengonversi exec menjadi Promise
const execPromise = util.promisify(exec);

const compressPDF = async (qualityCompress) => {
  try {
    let messageCompress;
    const outputFiles = path.join(__dirname, "..", "..", "output", "compressed_result");
    const files = fs.readdirSync(path.join(__dirname, "..", "..", "input"));
    // check dir "output/compressed_result" if notExist make folder
    if (!fs.existsSync(outputFiles)) {
      fs.mkdirSync(outputFiles, { recursive: true });
      console.log("folder not exist , creating folder ......");
    }

    for (const data of files) {
      const inputFiles = path.join(__dirname, "..", "..", "input", data);
      const output = path.join(__dirname, "..", "..", "output", "compressed_result", `compressed_${data}`);
      const gsCommand = `gs \
-sDEVICE=pdfwrite \
-dCompatibilityLevel=1.5 \
-dPDFSETTINGS=/${qualityCompress} \
-dDownsampleColorImages=true \
-dColorImageResolution=72 \
-dNOPAUSE \
-dQUIET \
-dBATCH \
-sOutputFile='${output}' '${inputFiles}'`;
      const { stderr } = await execPromise(gsCommand);
      if (stderr) {
        console.error(`Error when compressing PDF :, ${stderr}`);
        messageCompress = "error compressing";
        return messageCompress;
      }
    }
    messageCompress = "success compress"
    return messageCompress
  } catch (err) {
    console.log(err);
  }
};

export default compressPDF