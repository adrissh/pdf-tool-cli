# SAN-PDF-Tool

<p align="center">
  <img src="images/main menu.jpg" alt="Main menu">
</p>


## 📌 Description
PDF CLI Tool is a command-line-based application built with Node.js, JavaScript, Ghostscript, and PDF Lib for efficient PDF file management.
The UI is designed using the libraries Inquirer and Chalk to be intuitive and comfortable to use.


## ✨ Features  
- 🔗 Merge PDF – Combine multiple PDF files into one 
- ✂ Split PDF – Extract specific pages from a PDF file 
- 🔄 Convert PDF – Convert a PDF to image formats (PNG, JPEG) 
- 📦 Compress PDF – Reduce the file size of a PDF  


## 📋 Prerequisite
Make sure your device has the following installed:
- Node.js (Latest version recommended)
- Ghostscript (PDF processing)
- Git (Version control)

## 🚀 Technologies Used
- Node.js – JavaScript runtime for building CLI applications
- JavaScript – The main programming language
- Ghostscript – A library for processing and manipulating PDFs
- PDF Lib – A flexible library for PDF file manipulation
- Inquirer & Chalk – For creating an intuitive and user-friendly CLI UI

## 📥 installation
```bash
# Clone the repository
git clone https://github.com/adrissh/pdf-tool-cli.git

# Navigate to the project directory
cd repository

# Install dependencies
npm install

# Run the application
npm run start

```
## 📌 Usage Guide  

For PDF files that need to be converted, compressed, merged, or split, all files must be stored in the **"input"** directory. The processed results will be saved in the **"output"** directory, with the following structure:  

- **"output/merged_result"** → Stores the results of merging PDF files.  
- **"output/convert_result"** → Stores the results of PDF file conversion.  
- **"output/compressed_result"** → Stores the results of PDF file compression.  
- **"output/split_result"** → Stores the results of splitting PDF files.  

The **"output"** directory and its folders will be created automatically when the process runs.  

Easy, right? Just run it and you're good to go! 🚀😆  


```
└── 📁san_pdf_tools
    └── 📁input
        └── 📄 report.pdf 
        └── 📄 invoice_2024.pdf  
        └── 📄 project_proposal.pdf 
        └── 📄 financial_statement.pdf 
    └── 📁output
        └── 📁compressed_result
        └── 📁convert_result
        └── 📁merged_result
        └── 📁split_result
    └── 📁src
        └── 📁cli
        └── 📁images
        └── 📁services
    └── .gitignore
    └── package-lock.json
    └── package.json
```    
## 📞 Contact
If you have any questions or suggestions, contact me at:
- Email: adrilukman73@gmail.com
- LinkedIn: [Profil LinkedIn](https://www.linkedin.com/in/adri-lukman-8b85521b8/)
