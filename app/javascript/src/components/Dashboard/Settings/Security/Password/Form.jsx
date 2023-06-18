import React, { useState } from "react";

import { Button } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import siteApi from "apis/site";

import {
  VALIDATION_SCHEMA,
  MINIMUM_PASSWORD_LENGTH,
  INITIAL_FORM_VALUES,
  VALID_PASSWORD_REGEX,
  INPUT_TYPE,
} from "./constants";
import { renderPasswordVisibilityIcon } from "./utils";
import Validation from "./Validation";

const Form = ({ fetchSecurityDetails, setIsChangePasswordEnabled }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [inputType, setInputType] = useState(INPUT_TYPE.password);

  const { t } = useTranslation();

  const handleSubmit = async ({ password }) => {
    try {
      await siteApi.update({ password });
      fetchSecurityDetails();
    } catch (error) {
      logger.error(error);
    }
  };

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
      {({ dirty, errors, values: { password } }) => (
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
              disabled={!dirty}
              label={t("button.saveChanges")}
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
