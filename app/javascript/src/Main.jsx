import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import "common/i18n";
import ErrorPage from "components/Common/ErrorPage";
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

const Main = ({ notFoundError, setNotFoundError }) => {
  const { show: show404Error } = notFoundError;

  if (show404Error) {
    return (
      <ErrorPage
        homeUrl={ARTICLES_URL}
        notFoundError={notFoundError}
        setNotFoundError={setNotFoundError}
      />
    );
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <Switch>
        <Route exact component={CreateArticle} path={NEW_ARTICLE_URL} />
        <Route exact component={UpdateArticle} path={EDIT_ARTICLE_URL} />
        <Route exact component={Settings} path={SETTINGS_URL} />
        <Route exact component={Articles} path={ARTICLES_URL} />
        <Redirect exact from="/" to={ARTICLES_URL} />
        <Route path="*" render={() => <ErrorPage homeUrl={ARTICLES_URL} />} />
      </Switch>
    </div>
  );
};

export default Main;
