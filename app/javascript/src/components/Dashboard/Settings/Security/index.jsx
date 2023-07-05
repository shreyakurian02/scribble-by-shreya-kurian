import React, { useEffect, useState } from "react";

import { Label, Switch, Spinner } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { useShowSite, useUpdateSite } from "hooks/reactQuery/useSiteApi";

import Password from "./Password";

import Header from "../Header";

const Security = () => {
  const { t } = useTranslation();

  const [isSecurityEnabled, setIsSecurityEnabled] = useState(false);
  const [isChangePasswordEnabled, setIsChangePasswordEnabled] = useState(false);

  const { mutate: updateSite } = useUpdateSite();
  const { isLoading, data: siteSettings = {} } = useShowSite({});

  const { is_password_protected: isSitePasswordProtected = false } =
    siteSettings;

  const handleRemovePassword = () => updateSite({ password: null });

  const handleSecurityToggle = () => {
    setIsSecurityEnabled(isSecurityEnabled => !isSecurityEnabled);
    isSitePasswordProtected && handleRemovePassword();
  };

  useEffect(() => {
    !isEmpty(siteSettings) &&
      setIsSecurityEnabled(siteSettings.is_password_protected);
  }, [siteSettings]);

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
