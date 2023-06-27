import React, { useEffect, useState } from "react";

import { Button, Typography, Spinner } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import siteApi from "apis/site";

import { VALIDATION_SCHEMA } from "./constants";

import Header from "../Header";

const General = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [site, setSite] = useState({});

  const { t } = useTranslation();

  const fetchSite = async () => {
    try {
      const {
        data: { site },
      } = await siteApi.show();
      setSite(site);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async ({ title }) => {
    try {
      const payload = { title };
      await siteApi.update(payload);
      fetchSite();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchSite();
  }, []);

  return (
    <div className="mx-auto w-1/2 space-y-5 py-16">
      <Header
        subtitle={t("settings.generalSubtitle")}
        title={t("settings.general")}
      />
      {isLoading ? (
        <div className="flex h-20 w-1/2 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Form
          formikProps={{
            onSubmit: handleSubmit,
            initialValues: { title: site.title },
            validationSchema: VALIDATION_SCHEMA,
            enableReinitialize: true,
          }}
        >
          {({ dirty, isSubmitting }) => (
            <div className="space-y-3">
              <Input
                label={t("common.siteTitle")}
                name="title"
                placeholder={t("placeholder.addSiteTitle")}
              />
              <Typography className="neeto-ui-text-gray-600" style="body3">
                {t("settings.generalDescription")}
              </Typography>
              <div className="flex space-x-2">
                <Button
                  disabled={!dirty || isSubmitting}
                  label={t("button.saveChanges")}
                  loading={isSubmitting}
                  type="submit"
                />
                <Button label={t("button.cancel")} style="text" type="reset" />
              </div>
            </div>
          )}
        </Form>
      )}
    </div>
  );
};

export default General;
