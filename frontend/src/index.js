import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { TokenProvider } from "./context/TokenContext";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { MessageProvider } from "./context/MessageContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TokenProvider>
    <ModalProvider>
      <MessageProvider>
        <UserProvider>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </UserProvider>
      </MessageProvider>
    </ModalProvider>
  </TokenProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
