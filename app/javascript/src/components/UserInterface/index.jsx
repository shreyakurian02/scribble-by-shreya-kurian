import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { isEmpty, isNil, either } from "ramda";
import { Route, Switch } from "react-router";

import siteApi from "apis/site";
import ErrorPage from "components/Common/ErrorPage";
import {
  PREVIEW_URL,
  EUI_LOGIN,
  EUI_ARTICLE,
  EUI_INVALID_ROUTE,
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
      <Route
        exact
        path={EUI_LOGIN}
        render={() => <Authentication site={site} />}
      />
      <Route
        path={EUI_INVALID_ROUTE}
        render={() => <ErrorPage homeUrl={PREVIEW_URL} />}
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
        path={PREVIEW_URL}
        redirectRoute={EUI_LOGIN}
        site={site}
      />
    </Switch>
  );
};

export default UserInterface;
