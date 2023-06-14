import React from "react";

import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  site,
  redirectRoute,
}) => {
  if (!condition) {
    return <Redirect to={{ pathname: redirectRoute }} />;
  }

  return <Route exact path={path} render={() => <Component site={site} />} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  condition: PropTypes.bool,
  path: PropTypes.string,
  redirectRoute: PropTypes.string,
};

export default PrivateRoute;
