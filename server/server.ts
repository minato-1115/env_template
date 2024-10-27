import { Request,Response } from "express";
import express from "express";
import os from "os"
import {exec} from "child_process"
import fs from "fs"
import path from "path"
import cors from "cors"
import multer from "multer";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT||3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(express.static(path.join(__dirname, '../client/dist')));

// すべてのリクエストで`index.html`を返す設定
app.get('*', (req:Request, res: Response ) => {

  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'), (err) => {
    if (err) {
      res.status(500).send("Error loading index.html");
};
})});


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

  const pdfPath = path.join(__dirname, 'process_pdf.pdf');
  const docxPath = path.join(__dirname, 'converted.docx');
  const scriptPath = path.join(__dirname, 'process_pdf.py');

  fs.writeFileSync(pdfPath, req.file.buffer);

  const pythonPath = os.platform()=== 'win32' ? path.join(__dirname, 'venv', 'Scripts', 'python'):path.join(__dirname, 'venv', 'bin', 'python');
  
  exec(`${pythonPath} ${scriptPath} ${pdfPath} ${docxPath}`,(error,stdout) => {
    if(error){
      console.error("スクリプトの実行エラー:",error)
      res.status(500).send("PDF変換エラー")
      return 
    }
    console.log("スクリプト標準出力:",stdout)
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
