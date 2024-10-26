import express, { Request,Response } from "express";

import os from "os"
import {exec} from "child_process"
import fs from "fs"
import * as path from "path"
import multer from "multer";
import cors from "cors"
const app = express();
const port = process.env.PORT||3001;


interface MulterRequest extends Request {
  file?:Express.Multer.File
}

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? "https://create-template-server-5510e22ac8f9.herokuapp.com"
  : 'http://localhost:5173',
  optionsSuccessStatus: 200
  
};

app.use(cors(corsOptions))

// ディレクトリが存在しない場合は作成

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '../client/build')));

// すべてのリクエストで`index.html`を返す設定
app.get('*', ( res: Response ) => {

  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.post('/upload', upload.single('file'), (req:MulterRequest, res: Response):void =>{
  if (!req.file) {
    console.log("ファイルが送信されていません")
    res.status(400).send('ファイルが送信されていません');
    return }

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
