import React from "react";

import { Eye, Hide } from "neetoicons";

import { INPUT_TYPE } from "./constants";

export const renderPasswordVisibilityIcon = ({
  isPasswordHidden,
  setIsPasswordHidden,
  setInputType,
}) => {
  const handleHidePassword = () => {
    setIsPasswordHidden(true);
    setInputType(INPUT_TYPE.password);
  };

  const handleShowPasword = () => {
    setIsPasswordHidden(false);
    setInputType(INPUT_TYPE.text);
  };

  return !isPasswordHidden ? (
    <Hide onClick={handleHidePassword} />
  ) : (
    <Eye onClick={handleShowPasword} />
  );
};
