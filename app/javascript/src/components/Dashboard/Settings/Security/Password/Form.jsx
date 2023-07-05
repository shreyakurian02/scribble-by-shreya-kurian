import React, { useState } from "react";

import { Button } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useUpdateSite } from "hooks/reactQuery/useSiteApi";

import {
  VALIDATION_SCHEMA,
  MINIMUM_PASSWORD_LENGTH,
  INITIAL_FORM_VALUES,
  VALID_PASSWORD_REGEX,
  INPUT_TYPE,
} from "./constants";
import { renderPasswordVisibilityIcon } from "./utils";
import Validation from "./Validation";

const Form = ({ setIsChangePasswordEnabled }) => {
  const { t } = useTranslation();

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [inputType, setInputType] = useState(INPUT_TYPE.password);

  const { mutate: updateSite } = useUpdateSite({
    onSuccess: () => setIsChangePasswordEnabled(false),
  });

  const handleSubmit = ({ password }) => updateSite({ password });

  const handleReset = () => setIsChangePasswordEnabled(false);

  return (
    <NeetoUIForm
      formikProps={{
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
        onReset: handleReset,
      }}
    >
      {({ dirty, isSubmitting, errors, values: { password } }) => (
        <div className="space-y-5">
          <Input
            className="w-3/4"
            label={t("input.password")}
            name="password"
            placeholder={t("placeholder.enterPassword")}
            type={inputType}
            error={
              errors.password?.includes(
                t("validations.required", { entity: t("input.password") })
              ) && errors.password
            }
            suffix={renderPasswordVisibilityIcon({
              setInputType,
              setIsPasswordHidden,
              isPasswordHidden,
            })}
          />
          <div className="neeto-ui-text-gray-500">
            <Validation
              isValid={password.match(VALID_PASSWORD_REGEX)}
              message={t("validations.passwordFormat")}
            />
            <Validation
              isValid={password.length >= MINIMUM_PASSWORD_LENGTH}
              message={t("validations.minimumPasswordLength")}
            />
          </div>
          <div className="flex flex-row space-x-2 py-4">
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
    </NeetoUIForm>
  );
};

export default Form;
