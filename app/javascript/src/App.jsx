import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import "common/i18n";
import { initializeLogger } from "common/logger";
import Sidebar from "components/Common/Sidebar";
import Articles from "components/Dashboard/Articles";
import CreateArticle from "components/Dashboard/Articles/Form/Create";
import UpdateArticle from "components/Dashboard/Articles/Form/Update";
import Settings from "components/Dashboard/Settings";
import {
  ARTICLES_URL,
  NEW_ARTICLE_URL,
  EDIT_ARTICLE_URL,
  SETTINGS_URL,
} from "constants";
import { CategoriesProvider } from "contexts/categories";

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
        <div className="flex h-screen w-full">
          <Sidebar />
          <Switch>
            <Route exact component={Articles} path={ARTICLES_URL} />
            <Route exact component={CreateArticle} path={NEW_ARTICLE_URL} />
            <Route exact component={UpdateArticle} path={EDIT_ARTICLE_URL} />
            <Route exact component={Settings} path={SETTINGS_URL} />
            <Redirect exact from="/" to={ARTICLES_URL} />
          </Switch>
        </div>
      </CategoriesProvider>
    </Router>
  );
};

export default App;
