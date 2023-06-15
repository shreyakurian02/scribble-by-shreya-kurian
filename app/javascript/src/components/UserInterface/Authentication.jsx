import React, { useState } from "react";

import { Button, Typography } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { setAuthHeaders } from "apis/axios";
import sessionApi from "apis/public/session";
import { PREVIEW_URL } from "constants/urls";
import { setToSessionStorage } from "utils/storage";

import { LOGIN_INTIAL_VALUES, LOGIN_VALIDATION_SCHEMA } from "./constants";

const Authentication = ({ site }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const { title } = site;

  const handleSubmit = async ({ password }) => {
    setIsLoading(true);
    try {
      const {
        data: { authentication_token },
      } = await sessionApi.login({ password });
      setToSessionStorage(authentication_token);
      setAuthHeaders();
      window.location.href = PREVIEW_URL;
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-1/3">
        <Typography style="h2">
          {t("headers.siteProtected", { site: title })}
        </Typography>
        <Typography className="neeto-ui-text-gray-500" style="body1">
          {t("headers.enterPassword", { site: title })}
        </Typography>
        <Form
          formikProps={{
            initialValues: LOGIN_INTIAL_VALUES,
            validationSchema: LOGIN_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <div className="mt-3 space-y-5 text-center">
            <Input
              required
              label={t("input.password")}
              name="password"
              placeholder={t("placeholder.enterPassword")}
            />
            <Button
              fullWidth
              label={t("button.continue")}
              loading={isLoading}
              type="submit"
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Authentication;
