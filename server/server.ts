import { Response } from "express";
const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = process.env.PORT||3001;
const cors = require("cors")
const os = require("os")



const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? "https://create-template-server-5510e22ac8f9.herokuapp.com"
  : 'http://localhost:5173',
  optionsSuccessStatus: 200
  
};

app.use(cors(corsOptions))

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '../client/dist')));

// すべてのリクエストで`index.html`を返す設定
app.get('*', ( res: Response) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.post('/upload', upload.single('file'), (req: { file: { originalname: any; mimetype: any; size: any; buffer: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; download: (arg0: any, arg1: string, arg2: () => void) => void; }) => {
  if (!req.file) {
    console.log("ファイルが送信されていません")
    return res.status(400).send('ファイルが送信されていません');
  }

  console.log('アップロードされたファイル情報:', {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });

  const pdfPath = path.join(__dirname, 'generated.pdf');
  const docxPath = path.join(__dirname, 'converted.docx');
 
 
  fs.writeFileSync(pdfPath, req.file.buffer);

  
  const pythonPath = os.platform()=== 'win32' ? path.join(__dirname, 'venv', 'Scripts', 'python'):path.join(__dirname, 'venv', 'bin', 'python');
  
  exec(`${pythonPath} process_pdf.py ${pdfPath} ${docxPath}`,() => {
    
    res.download(docxPath, 'converted.docx', () => {
      console.log(docxPath);
      
      fs.unlinkSync(pdfPath);
      fs.unlinkSync(docxPath);
    });
  });
});

app.listen(port, () => {
  console.log(`サーバーがポート ${port} で起動しました`);
});
