import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router.jsx";
import AuthProvider from "./AuthProvider/AuthProvider";
// import { QueryClient, QueryClientProvider } from "react-query";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={Router} />
    </React.StrictMode>
  </AuthProvider>
);
