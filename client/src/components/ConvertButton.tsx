import { useContext, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { pdf } from "@react-pdf/renderer";
import CreatePDF from "./CreatePDF";
import { MyContext } from "../hooks/useTestHook";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ConvertButton = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const context = useContext(MyContext);
  
  if (!context) {
    throw new Error("MyContext.Provider が正しく設定されていません");
  }

  const { state } = context;
  const generatePdf = async () => {
    try {
      const pdfInstance = pdf(<CreatePDF state={state} />);
      const blob = await pdfInstance.toBlob();
      setPdfBlob(blob);
    } catch (error) {
      console.error("PDFの生成中にエラーが発生しました:", error);
      alert("PDFの生成に失敗しました");
    }
  };

  const handleSendPdf = () => {
    if (!pdfBlob) {
      throw new Error("MyContext.Provider が正しく設定されていません");
    }

    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "物理学実験表紙.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  
    const formData = new FormData();
    formData.append("file", pdfBlob, "index_template.pdf");
    console.log("アップロードするPDF:", pdfBlob);
    
    const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://create-template-server-5510e22ac8f9.herokuapp.com'
  : import.meta.env.VITE_API_URL;

  console.log("API URL:", API_URL);
    fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "物理学実験表紙.docx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error.message);
        console.error("エラー詳細:", error);
        // alert("pdfのアップロード中のエラー")
      });
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-evenly", margin: 24 }}
    >
      <IconButton
        sx={{ width: 136, borderRadius: 2 }}
        style={{ fontSize: 16, color: "#1976d2" }}
        onClick={generatePdf}
      >
        <UpdateIcon />
        　表紙の生成
      </IconButton>
      <IconButton
        sx={{ width: 128, borderRadius: 2 }}
        style={{ fontSize: 16 }}
        color="primary"
        onClick={handleSendPdf}
        disabled={!pdfBlob}
      >
        <DownloadIcon />
        　ダウンロード
      </IconButton>
    </div>
  );
};

export default ConvertButton;
