import React from "react";

import { Button, Typography, Spinner } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useShowSite, useUpdateSite } from "hooks/reactQuery/useSiteApi";

import { VALIDATION_SCHEMA } from "./constants";

import Header from "../Header";

const General = () => {
  const { t } = useTranslation();

  const { isLoading, data: site } = useShowSite();
  const { mutate: updateSite } = useUpdateSite();

  const handleSubmit = async ({ title }) => {
    const payload = { title };
    updateSite(payload);
  };

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
