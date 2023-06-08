import React from "react";

import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { VALIDATION_SCHEMA } from "./constants";

const Form = ({ selectedRedirection = {}, isEdit = false, onClose }) => {
  const { t } = useTranslation();

  const { from_path: from = "", to_path: to = "" } = selectedRedirection;

  const buildInitialValues = () =>
    isEdit ? { from, to } : { from: "", to: "" };

  const handleSubmit = () => {};

  return (
    <NeetoUIForm
      formikProps={{
        onSubmit: handleSubmit,
        enableReinitialize: true,
        initialValues: buildInitialValues(),
        validationSchema: VALIDATION_SCHEMA,
      }}
    >
      {({ dirty }) => (
        <div className="neeto-ui-bg-white flex p-4">
          <div className="grid w-full grid-cols-2 space-x-2">
            <Input
              name="from"
              placeholder={t("placeholder.addFromPath")}
              size="large"
            />
            <div className="flex justify-between">
              <Input
                name="to"
                placeholder={t("placeholder.addToPath")}
                size="large"
              />
              <div className="flex h-10">
                <Button
                  disabled={!dirty}
                  icon={() => <Check color="#268E6C" />}
                  style="text"
                  type="submit"
                />
                <Button
                  icon={() => <Close color="#D7373F" />}
                  style="text"
                  type="reset"
                  onClick={onClose}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </NeetoUIForm>
  );
};

export default Form;
