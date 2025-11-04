import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./context/themeContext";
import { AuthProvider } from "./context/authContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </ThemeProvider>
);
