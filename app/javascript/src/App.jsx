import React, { useState, useEffect } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import "common/i18n";
import { initializeLogger } from "common/logger";
import Sidebar from "components/Common/Sidebar";
import Articles from "components/Dashboard/Articles";
import CreateArticle from "components/Dashboard/Articles/Form/Create";
import { ARTICLES_URL, NEW_ARTICLE_URL } from "constants";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <div className="flex h-screen w-full">
        <Sidebar />
        <Switch>
          <Route exact component={Articles} path={ARTICLES_URL} />
          <Route exact component={CreateArticle} path={NEW_ARTICLE_URL} />
          <Redirect exact from="/" to={ARTICLES_URL} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
