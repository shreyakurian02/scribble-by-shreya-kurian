import React from "react";

import { Button, Typography } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";

import Header from "../Header";

const General = () => {
  const { t } = useTranslation();

  const handleSubmit = () => {};

  return (
    <div className="flex flex-col space-y-5">
      <Header
        subTitle={t("settings.generalSubtitle")}
        title={t("settings.generalTitle")}
      />
      <Form
        formikProps={{
          onSubmit: handleSubmit,
          initialValues: INITIAL_VALUES,
          validationSchema: VALIDATION_SCHEMA,
        }}
      >
        {({ dirty }) => (
          <div className="space-y-3">
            <Input
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
    </div>
  );
};

export default General;
