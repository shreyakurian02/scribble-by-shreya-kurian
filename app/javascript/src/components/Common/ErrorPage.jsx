import React from "react";

import { Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";

const ErrorPage = ({
  notFoundError = {},
  homeUrl = "",
  setNotFoundError = () => {},
}) => {
  const { t } = useTranslation();

  const { message = t("errors.pageNotFound") } = notFoundError;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-2">
      <Typography style="h2">{message}</Typography>
      <Button
        label="Go home"
        to={homeUrl}
        onClick={() =>
          setNotFoundError({ show: false, message: t("errors.pageNotFound") })
        }
      />
    </div>
  );
};

export default ErrorPage;
