
const {PDFDocument} = require('pdf-lib')
const mergePDFs = async()=>{
    const mergePDF = await PDFDocument.create()
    console.log(mergePDF)
    console.info("Hello World")
}

mergePDFs()