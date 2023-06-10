import React from "react";

import { Eye, Hide } from "neetoicons";

import { INPUT_TYPE } from "./constants";

export const renderPasswordVisibilityIcon = ({
  isPasswordHidden,
  setIsPasswordHidden,
  setInputType,
}) =>
  !isPasswordHidden ? (
    <Hide
      onClick={() => {
        setIsPasswordHidden(true);
        setInputType(INPUT_TYPE.password);
      }}
    />
  ) : (
    <Eye
      onClick={() => {
        setIsPasswordHidden(false);
        setInputType(INPUT_TYPE.text);
      }}
    />
  );
