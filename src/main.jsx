import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contextapi/UserAuth.jsx";
import { GroupsContextProvider } from "./contextapi/GroupsContext.jsx";
import { BillContextProvider } from "./contextapi/BillContextApi.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GroupsContextProvider>
          <BillContextProvider>
            <App />
          </BillContextProvider>
        </GroupsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
