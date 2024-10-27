import { Request,Response } from "express";
import express from "express";
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

app.use(express.static(path.join(__dirname, '../client/build')));

// すべてのリクエストで`index.html`を返す設定
app.get('*', ( res: Response ) => {

  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.post('/upload', upload.single('file'), (req:Request, res: Response):void =>{
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
