import React, { useEffect, useState } from "react";

import { Label, Switch, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";

import siteApi from "apis/site";

import Password from "./Password";

import Header from "../Header";

const Security = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(false);
  const [isChangePasswordEnabled, setIsChangePasswordEnabled] = useState(false);
  const [siteSettings, setSiteSettings] = useState({});

  const { t } = useTranslation();

  const { is_password_protected: isSitePasswordProtected } = siteSettings;

  const handleRemovePassword = async () => {
    try {
      await siteApi.update({ password: null });
      fetchSecurityDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSecurityToggle = () => {
    setIsSecurityEnabled(isSecurityEnabled => !isSecurityEnabled);
    isSitePasswordProtected && handleRemovePassword();
  };

  const fetchSecurityDetails = async () => {
    setIsLoading(true);
    try {
      const {
        data: { site },
      } = await siteApi.show();
      setSiteSettings(site);
      setIsSecurityEnabled(site.is_password_protected);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityDetails();
  }, []);

  return (
    <div className="mx-auto w-1/2 space-y-5 py-16">
      <Header
        subtitle={t("settings.securitySubtitle")}
        title={t("settings.security")}
      />
      {isLoading ? (
        <div className="flex w-1/2 justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <Label className="neeto-ui-font-bold">
              {t("labels.passwordProtect")}
            </Label>
            <Switch
              checked={isSecurityEnabled}
              onClick={handleSecurityToggle}
            />
          </div>
          {isSecurityEnabled && (
            <Password
              fetchSecurityDetails={fetchSecurityDetails}
              isChangePasswordEnabled={isChangePasswordEnabled}
              isSecurityEnabled={isSecurityEnabled}
              isSitePasswordProtected={isSitePasswordProtected}
              setIsChangePasswordEnabled={setIsChangePasswordEnabled}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Security;
