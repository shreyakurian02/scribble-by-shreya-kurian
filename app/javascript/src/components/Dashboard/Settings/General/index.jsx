import React, { useEffect, useState } from "react";

import { Spinner } from "@bigbinary/neetoui";
import { Button, Typography } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import siteApi from "apis/site";

import { VALIDATION_SCHEMA } from "./constants";

import Header from "../Header";

const General = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [site, setSite] = useState("");

  const { t } = useTranslation();

  const fetchSite = async () => {
    setIsLoading(true);
    try {
      const {
        data: { site },
      } = await siteApi.show();
      setSite(site);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async ({ siteTitle }) => {
    try {
      const payload = { title: siteTitle };
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
    <div className="flex w-1/2 flex-col space-y-5">
      <Header
        subTitle={t("settings.generalSubtitle")}
        title={t("settings.generalTitle")}
      />
      {isLoading ? (
        <div className="flex h-20 w-1/2 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Form
          formikProps={{
            onSubmit: handleSubmit,
            initialValues: { siteTitle: site.title },
            validationSchema: VALIDATION_SCHEMA,
            enableReinitialize: true,
          }}
        >
          {({ dirty }) => (
            <div className="space-y-3">
              <Input
                isLoading={isLoading}
                label={t("common.siteTitle")}
                name="siteTitle"
                placeholder={t("placeholder.addSiteTitle")}
              />
              <Typography className="neeto-ui-text-gray-600" style="body3">
                {t("settings.generalDescription")}
              </Typography>
              <div className="flex space-x-2">
                <Button
                  disabled={!dirty}
                  label={t("button.saveChanges")}
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
