import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import "common/i18n";
import { initializeLogger } from "common/logger";
import { CategoriesProvider } from "contexts/categories";

import EUI from "./components/Dashboard/EUI";
import { PREVIEW_URL } from "./constants";
import Main from "./Main";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setIsLoading);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <CategoriesProvider>
        <Switch>
          <Route component={EUI} path={PREVIEW_URL} />
          <Route component={Main} path="/" />
        </Switch>
      </CategoriesProvider>
    </Router>
  );
};

export default App;
