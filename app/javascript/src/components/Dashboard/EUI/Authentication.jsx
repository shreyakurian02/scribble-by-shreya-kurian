import React, { useState } from "react";

import { Button, Typography } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { setAuthHeaders } from "apis/axios";
import sessionsApi from "apis/public/sessions";
import { setToSessionStorage } from "utils/storage";

const Authentication = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async ({ password }) => {
    setIsLoading(true);
    try {
      const response = await sessionsApi.login({ password });
      setToSessionStorage({
        authToken: response.data.authentication_token,
      });
      setAuthHeaders();
      window.location.href = "/public";
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-1/3">
        <Typography style="h2">{t("headers.siteProtected")}</Typography>
        <Typography className="neeto-ui-text-gray-500" style="body1">
          {t("headers.enterPassword")}
        </Typography>
        <Form
          formikProps={{
            initialValues: { password: "" },
            validationSchema: yup.object().shape({
              password: yup.string().required("Required"),
            }),
            onSubmit: handleSubmit,
          }}
        >
          <div className="mt-3 space-y-5 text-center">
            <Input
              required
              label="Password"
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
