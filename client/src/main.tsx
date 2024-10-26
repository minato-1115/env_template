import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MyContextProvider } from "./hooks/useTestHook.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      {/* アプリ全体をMyContextProviderでラップ */}
      <MyContextProvider>
        <App />
      </MyContextProvider>
    </StrictMode>
  );
}
