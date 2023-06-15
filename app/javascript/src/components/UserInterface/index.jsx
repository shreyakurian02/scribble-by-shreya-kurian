import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { isEmpty, isNil, either } from "ramda";
import { Route, Switch, Redirect } from "react-router";

import siteApi from "apis/site";
import ErrorPage from "components/Common/ErrorPage";
import {
  PREVIEW_URL,
  EUI_LOGIN,
  EUI_ARTICLE,
  EUI_INVALID_URL,
  PUBLIC_ARTICLES_URL,
} from "constants/urls";
import { getFromSessionStorage } from "utils/storage";

import Authentication from "./Authentication";
import Preview from "./Preview";
import PrivateRoute from "./PrivateRoute";

const UserInterface = ({ notFoundError, setNotFoundError }) => {
  const [site, setSite] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const authToken = getFromSessionStorage("authToken");

  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  const { is_password_protected: isPasswordProtected = false } = site;
  const hasAccess = (isPasswordProtected && isLoggedIn) || !isPasswordProtected;
  const { show: show404Error } = notFoundError;

  const fetchSite = async () => {
    setIsLoading(true);
    try {
      const {
        data: { site },
      } = await siteApi.show();
      setSite(site);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSite();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  if (show404Error) {
    return (
      <ErrorPage
        homeUrl={PREVIEW_URL}
        notFoundError={notFoundError}
        setNotFoundError={setNotFoundError}
      />
    );
  }

  return (
    <Switch>
      <Redirect exact from={PREVIEW_URL} to={PUBLIC_ARTICLES_URL} />
      {hasAccess && <Redirect exact from={EUI_LOGIN} to={PREVIEW_URL} />}
      <Route
        path={EUI_INVALID_URL}
        render={() => <ErrorPage homeUrl={PREVIEW_URL} />}
      />
      <Route
        exact
        path={EUI_LOGIN}
        render={() => <Authentication site={site} />}
      />
      <PrivateRoute
        component={Preview}
        condition={hasAccess}
        path={EUI_ARTICLE}
        redirectRoute={EUI_LOGIN}
        site={site}
      />
      <PrivateRoute
        component={Preview}
        condition={hasAccess}
        path={PUBLIC_ARTICLES_URL}
        redirectRoute={EUI_LOGIN}
        site={site}
      />
      <Route path="*" render={() => <ErrorPage homeUrl={PREVIEW_URL} />} />
    </Switch>
  );
};

export default UserInterface;
