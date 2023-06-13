import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { isEmpty, isNil, either } from "ramda";
import { Route, Switch } from "react-router";

import siteApi from "apis/site";
import { PREVIEW_URL } from "constants";
import { getFromSessionStorage } from "utils/storage";

import Authentication from "./Authentication";
import Preview from "./Preview";
import PrivateRoute from "./PrivateRoute";

const EUI = () => {
  const [site, setSite] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const authToken = getFromSessionStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  const { is_password_protected: isPasswordProtected = false } = site;

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

  return (
    <Switch>
      <Route exact component={Authentication} path="/public/login" />
      <PrivateRoute
        component={Preview}
        condition={(isPasswordProtected && isLoggedIn) || !isPasswordProtected}
        path="/public/:slug"
        redirectRoute="/public/login"
      />
      <PrivateRoute
        component={Preview}
        condition={(isPasswordProtected && isLoggedIn) || !isPasswordProtected}
        path={PREVIEW_URL}
        redirectRoute="/public/login"
      />
    </Switch>
  );
};

export default EUI;
