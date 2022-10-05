import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);
