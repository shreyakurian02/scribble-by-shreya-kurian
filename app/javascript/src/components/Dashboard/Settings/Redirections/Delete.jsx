import { SINGULAR } from "constants";

import React from "react";

import { Alert } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import redirectionsApi from "apis/redirections";

import { ACTION } from "./constants";

const Delete = ({ manageRedirection, onClose, refetchRedirections }) => {
  const { t } = useTranslation();

  const {
    redirection: {
      from_path: fromPath,
      to_path: toPath,
      id: selectedRedirectionId,
    } = {},
    action,
  } = manageRedirection;

  const handleSubmit = async () => {
    try {
      await redirectionsApi.destroy(selectedRedirectionId);
      refetchRedirections();
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

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
