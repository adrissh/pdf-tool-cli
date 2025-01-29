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



const splitPDF = async ()=>{
    let messageSplit
    // create folder
    try{
     const folderName = "split_result";
     const folderPath = path.join(__dirname,'..','..',folderName);
     if (!fs.existsSync(folderPath)) {
       fs.mkdirSync(folderPath);
    //    console.log(`success created folder in ${folderPath}`)
     }
    }catch(err){
        console.log(`Error When Creating FolderPath ${err}`)
    }

    // procces split pdf files
    try{
        const pathFile  = '../../split_result/split_page_%d.pdf';
        // const gsCommand = `gs -sDEVICE=pdfwrite -dNOPAUSE -dBATCH -dSAFER -sOutputFile='${path.join(__dirname,'../../split_result/split_files_result-'+'%d'+'.pdf')}' '${path.join(__dirname,'../../merged_result/joined.pdf')}'`
        const gsCommand = `gs -sDEVICE=pdfwrite -dNOPAUSE -dBATCH -dSAFER -sOutputFile='${path.join(__dirname,pathFile)}' '${path.join(__dirname,'../../merged_result/joined.pdf')}'`
        const {stderr} = await execPromise(gsCommand)
        if(stderr){
            console.error(`errro split proses ${stderr}`)
            messageSplit = "split failed"
            return messageSplit
        }
        messageSplit = "split success"
        return messageSplit
    }catch(err){
        console.log(`Error When Split pdf files ${err}`)
    }

}

// splitPDF()

export default splitPDF