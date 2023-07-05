import React from "react";

import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  useCreateRedirection,
  useUpdateRedirection,
} from "hooks/reactQuery/useRedirectionsApi";

import { INITIAL_VALUE, VALIDATION_SCHEMA } from "./constants";

const Form = ({ selectedRedirection = {}, isEdit = false, onClose }) => {
  const { t } = useTranslation();
  const { mutate: createRedirection } = useCreateRedirection({
    onSuccess: onClose,
  });

  const { mutate: updateRedirection } = useUpdateRedirection({
    onSuccess: onClose,
  });

  const {
    from_path: fromPath = "",
    to_path: toPath = "",
    id: selectedRedirectionId,
  } = selectedRedirection;

  const buildInitialValues = () =>
    isEdit ? { fromPath, toPath } : INITIAL_VALUE;

  const handleSubmit = ({ fromPath, toPath }) => {
    const payload = { from_path: fromPath, to_path: toPath };
    isEdit
      ? updateRedirection({ id: selectedRedirectionId, payload })
      : createRedirection(payload);
  };

  return (
    <NeetoUIForm
      formikProps={{
        onSubmit: handleSubmit,
        enableReinitialize: true,
        initialValues: buildInitialValues(),
        validationSchema: VALIDATION_SCHEMA,
      }}
    >
      {({ dirty, isSubmitting }) => (
        <div className="neeto-ui-bg-white border neeto-ui-border-primary-500 flex p-4">
          <div className="grid w-full grid-cols-2 space-x-2">
            <Input
              name="fromPath"
              placeholder={t("placeholder.addFromPath")}
              size="large"
            />
            <div className="flex justify-between">
              <Input
                name="toPath"
                placeholder={t("placeholder.addToPath")}
                size="large"
              />
              <div className="flex h-10">
                <Button
                  disabled={!dirty || isSubmitting}
                  icon={() => <Check color="#268E6C" />}
                  style="text"
                  type="submit"
                  onMouseDown={event => event.preventDefault()}
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
