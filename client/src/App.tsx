import  { useContext } from "react";
import { MyContext } from "./hooks/useTestHook";
import "./App.css";
import { PDFViewer } from "@react-pdf/renderer";
import CreatePDF from "./components/CreatePDF";
import InputForm from "./components/InputFom";
import useWindowSize from "./hooks/useWindowSize";
function App() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("MyContext.Provider が正しく設定されていません");
  }

  const { state } = context;


  // コンテキストがundefinedの場合のエラーハンドリング

  const windowSize = useWindowSize();
  return (
    <div className="view-style">
      <div className="card">
        <PDFViewer width={windowSize.width * 0.6} height={windowSize.height}>
          <CreatePDF state={state} />
        </PDFViewer>
      </div>
      <InputForm />
    </div>
  );
}

export default App;
