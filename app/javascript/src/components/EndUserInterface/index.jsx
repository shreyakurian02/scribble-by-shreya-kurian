import React from "react";

import { PageLoader } from "neetoui";
import { isEmpty, isNil, either } from "ramda";
import { Route, Switch, Redirect } from "react-router";

import ErrorPage from "components/Common/ErrorPage";
import {
  PREVIEW_URL,
  EUI_LOGIN_URL,
  EUI_ARTICLE_URL,
  EUI_INVALID_URL,
  PUBLIC_ARTICLES_URL,
} from "constants/urls";
import { useShowSite } from "hooks/reactQuery/public/useSiteApi";
import { getFromLocalStorage } from "utils/storage";

import Authentication from "./Authentication";
import Preview from "./Preview";
import PrivateRoute from "./PrivateRoute";

const EndUserInterface = ({ notFoundError, setNotFoundError }) => {
  const authToken = getFromLocalStorage("authToken");
  const { isLoading, data: site = {} } = useShowSite();

  const { show: show404Error } = notFoundError;
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  const {
    is_password_protected: isPasswordProtected = false,
    is_valid_token: isAuthTokenValid,
  } = site;

  const hasAccess =
    (isPasswordProtected && isLoggedIn && isAuthTokenValid) ||
    !isPasswordProtected;

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
      {hasAccess && <Redirect exact from={EUI_LOGIN_URL} to={PREVIEW_URL} />}
      <Route
        path={EUI_INVALID_URL}
        render={() => <ErrorPage homeUrl={PREVIEW_URL} />}
      />
      <Route
        exact
        path={EUI_LOGIN_URL}
        render={() => <Authentication site={site} />}
      />
      <PrivateRoute
        component={Preview}
        condition={hasAccess}
        path={EUI_ARTICLE_URL}
        redirectRoute={EUI_LOGIN_URL}
        site={site}
      />
      <PrivateRoute
        component={Preview}
        condition={hasAccess}
        path={PUBLIC_ARTICLES_URL}
        redirectRoute={EUI_LOGIN_URL}
        site={site}
      />
      <Route path="*" render={() => <ErrorPage homeUrl={PREVIEW_URL} />} />
    </Switch>
  );
};

export default EndUserInterface;
