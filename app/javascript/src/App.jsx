import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import "common/i18n";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import UserInterface from "components/UserInterface";
import { PREVIEW_URL, ADMIN_URL } from "constants/urls";
import { CategoriesProvider } from "contexts/categories";

import { DEFAULT_ERROR_VALUES } from "./constants";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(DEFAULT_ERROR_VALUES);

  useEffect(() => {
    initializeLogger();
    registerIntercepts(setNotFoundError);
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
          <Route
            path={ADMIN_URL}
            render={() => (
              <Dashboard
                notFoundError={notFoundError}
                setNotFoundError={setNotFoundError}
              />
            )}
          />
          <Route
            path={PREVIEW_URL}
            render={() => (
              <UserInterface
                notFoundError={notFoundError}
                setNotFoundError={setNotFoundError}
              />
            )}
          />
        </Switch>
      </CategoriesProvider>
    </Router>
  );
};

export default App;
