import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import Routes from "./components/Routes";
import {
  AuthStoreContextProvider,
  useAuthStoreContext,
} from "./components/Store";
import { useDataApi } from "./hooks/useDataApi";
import Profile from "./types/Profile";

function App() {
  

  return (
    <AuthStoreContextProvider>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </AuthStoreContextProvider>
  );
}

export default App;
