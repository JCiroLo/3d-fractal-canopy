import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MainProvider from "./providers/MainProvider.tsx";

import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>
);
