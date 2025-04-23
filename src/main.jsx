import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./assets/components/AuthUtils/AuthContexts.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <App />
  </StrictMode>
);
