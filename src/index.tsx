import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
