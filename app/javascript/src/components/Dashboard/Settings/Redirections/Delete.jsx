import { SINGULAR } from "constants";

import React from "react";

import { Alert } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import { useDestroyRedirection } from "hooks/reactQuery/useRedirectionsApi";

import { ACTION } from "./constants";

const Delete = ({ manageRedirection, onClose }) => {
  const { t } = useTranslation();

  const { mutate: destroyRedirection } = useDestroyRedirection({
    onSuccess: onClose,
  });

  const {
    redirection: {
      from_path: fromPath,
      to_path: toPath,
      id: selectedRedirectionId,
    } = {},
    action,
  } = manageRedirection;

  const handleSubmit = () => destroyRedirection(selectedRedirectionId);

  return (
    <Alert
      className="break-all"
      isOpen={action === ACTION.delete}
      submitButtonLabel={t("button.delete")}
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
