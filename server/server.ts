const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = 3001;
const cors = require("cors")

// multer設定：メモリに保存
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const corsOptions = {
  origin: 'http://localhost:5173', // クライアントのURL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))

app.post('/upload', upload.single('file'), (req, res) => {
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
 
  // PDFファイルを一時的に保存
  fs.writeFileSync(pdfPath, req.file.buffer);

  // Pythonスクリプトを実行してPDFをWordに変換
  const pythonPath = path.join(__dirname, 'venv', 'Scripts', 'python');  // Windows
  // const pythonPath = path.join(__dirname, 'venv', 'bin', 'python');   // macOS/Linux



  exec(`${pythonPath} process_pdf.py ${pdfPath} ${docxPath}`,() => {
    
    res.download(docxPath, 'converted.docx', () => {
      console.log(docxPath);
      // ダウンロード完了後にファイルを削除
      fs.unlinkSync(pdfPath);
      fs.unlinkSync(docxPath);
    });
  });
});

app.listen(port, () => {
  console.log(`サーバーがポート ${port} で起動しました`);
});
