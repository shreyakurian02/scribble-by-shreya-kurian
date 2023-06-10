import React, { useEffect, useState } from "react";

import { Label, Switch, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";

import Password from "./Password";

import Header from "../Header";

const Security = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(false);
  const [isChangePasswordEnabled, setIsChangePasswordEnabled] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    isPasswordPresent: false,
  });

  const { t } = useTranslation();

  const handleSecurityToggle = () => {
    setIsSecurityEnabled(isSecurityEnabled => !isSecurityEnabled);
    setIsChangePasswordEnabled(false);
  };

  const fetchSecurityDetails = () => {
    setIsLoading(true);
    try {
      const { is_secured } = { is_secured: true };
      setSiteSettings({ isPasswordPresent: is_secured });
      is_secured && setIsSecurityEnabled(true);
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
        subTitle={t("settings.securitySubtitle")}
        title={t("settings.securityTitle")}
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
              isChangePasswordEnabled={isChangePasswordEnabled}
              setIsChangePasswordEnabled={setIsChangePasswordEnabled}
              siteSettings={siteSettings}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Security;
