import React, { useState, useEffect } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Sidebar from "./components/Common/Sidebar";
import Articles from "./components/Dashboard/Articles";

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
          <Route exact component={Articles} path="/" />
          <Route exact path="/about" render={() => <div>About</div>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
