import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { useTranslation } from "react-i18next";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import "common/i18n";
import { initializeLogger } from "common/logger";
import UserInterface from "components/Dashboard/UserInterface";
import { CategoriesProvider } from "contexts/categories";

import { PREVIEW_URL } from "./constants";
import Main from "./Main";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  const [notFoundError, setNotFoundError] = useState({
    show: false,
    message: t("errors.pageNotFound"),
  });

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
            path={PREVIEW_URL}
            render={() => (
              <UserInterface
                notFoundError={notFoundError}
                setNotFoundError={setNotFoundError}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <Main
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
