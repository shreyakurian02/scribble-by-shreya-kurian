import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import "common/i18n";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import EndUserInterface from "components/EndUserInterface";
import { PREVIEW_URL, ADMIN_URL } from "constants/urls";
import { CategoriesProvider } from "contexts/categories";
import { setToLocalStorage } from "utils/storage";

import { DEFAULT_ERROR_VALUES } from "./constants";

const App = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(DEFAULT_ERROR_VALUES);

  const setUserToLocalStorage = () => {
    const { id, email } = user;
    setToLocalStorage({ key: "authUserId", value: id });
    setToLocalStorage({ key: "authUserEmail", value: email });
  };

  useEffect(() => {
    initializeLogger();
    registerIntercepts(setNotFoundError);
    setAuthHeaders(setIsLoading);
    setUserToLocalStorage();
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
                user={user}
              />
            )}
          />
          <Route
            path={PREVIEW_URL}
            render={() => (
              <EndUserInterface
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
