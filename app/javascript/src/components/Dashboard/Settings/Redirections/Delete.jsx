import React from "react";

import { Alert } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import { SINGULAR } from "constants";

import { ACTION } from "./constants";

const Delete = ({ manageRedirection, onClose }) => {
  const { t } = useTranslation();

  const { redirection: { from_path: fromPath, to_path: toPath } = {}, action } =
    manageRedirection;

  const handleSubmit = () => {};

  return (
    <Alert
      className="break-all"
      isOpen={action === ACTION.delete}
      submitButtonLabel={t("button.proceed")}
      message={
        <Trans
          i18nKey="alert.deleteRedirectionMessage"
          values={{
            from: fromPath,
            to: toPath,
          }}
        />
      }
      title={t("alert.deleteEntity", {
        entity: t("common.redirection", SINGULAR).toLowerCase(),
      })}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default Delete;
