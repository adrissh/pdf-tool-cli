import fs from "fs";
import path from "path";
import {exec} from 'child_process'
import { fileURLToPath } from "url";
import util from 'util'

// Mendapatkan __filename dan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Mengonversi exec menjadi Promise
const execPromise = util.promisify(exec);

const compressPDF = async () => {
  const date = new Date().toISOString();
  try{
     // create folder
     const folderName = "compressed_result";
     const folderPath = path.join(__dirname,'..','..',folderName);
     if (!fs.existsSync(folderPath)) {
       fs.mkdirSync(folderPath);
      //  console.log("folder created ...");
     }
  }catch(err){
    console.log(`Error When creating folder ${err}`)
  }



const gsCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/screen -dDownsampleColorImages=true -dColorImageResolution=72 -dNOPAUSE -dQUIET -dBATCH -sOutputFile='${path.join(__dirname, '../../compressed_result/compress_file_result-' + date + '.pdf')}' '${path.join(__dirname, '../../input_files/13__certificate databse.pdf')}'`;

  try {
    let messageCompress;
    const {stderr} = await execPromise(gsCommand)
         if(stderr){
            console.error(`Error when compressing PDF :, ${error}`)
            messageCompress = 'error compressing'
            return messageCompress
        }
        messageCompress = "success compress"
        return messageCompress

  } catch (err) {
    console.log(err);
  }
};


export default compressPDF
