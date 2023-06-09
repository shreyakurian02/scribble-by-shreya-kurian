import React from "react";

import classnames from "classnames";
import { Close, Check } from "neetoicons";
import { Typography } from "neetoui";

const Validation = ({ isValid, message }) => (
  <div
    className={classnames("flex items-center space-x-2", {
      "neeto-ui-text-success-500": isValid,
    })}
  >
    {isValid ? <Check size={15} /> : <Close size={15} />}
    <Typography style="body2">{message}</Typography>
  </div>
);

export default Validation;
