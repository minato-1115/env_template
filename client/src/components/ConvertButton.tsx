import React, {useContext, useState } from 'react';
import * as pdfjs from "pdfjs-dist";

import { pdf } from '@react-pdf/renderer';
import CreatePDF from './CreatePDF';
import { MyContext } from '../hooks/useTestHook';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ConvertButton =()=> {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('MyContext.Provider が正しく設定されていません');
  }

  const {state} = context;
  const generatePdf = async () => {
    try {
      const pdfInstance = pdf(<CreatePDF state={state} />);
      const blob = await pdfInstance.toBlob();
      setPdfBlob(blob);
    } catch (error) {
      console.error('PDFの生成中にエラーが発生しました:', error);
      alert('PDFの生成に失敗しました');
    }
  };

  const handleSendPdf = () => {
    if (!pdfBlob) {
      throw new Error('MyContext.Provider が正しく設定されていません');
    }

    const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = '物理学実験表紙.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
    if (!pdfBlob) {
      alert('PDFを生成してください');
      return;
    }
 
    const formData = new FormData();
    formData.append('file', pdfBlob, '物理学実験表紙.pdf');
    console.log('アップロードするPDF:', pdfBlob);

    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTPエラー! ステータス: ${response.status}`);
      }
      return response.blob();
    })
    .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = '物理学実験表紙.docx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('エラーが発生しました:', error.message);
      console.error('エラー詳細:', error);
      alert('PDFの送信中にエラーが発生しました');
    });
  };

  return (
    <div>
      <button onClick={generatePdf}>PDFを生成</button>
      <button onClick={handleSendPdf} disabled={!pdfBlob}>PDFをサーバーに送信</button>
    </div>
  );
}

export default ConvertButton;