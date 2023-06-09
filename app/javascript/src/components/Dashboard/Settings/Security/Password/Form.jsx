import React, { useState } from "react";

import { Button } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  VALIDATION_SCHEMA,
  MINIMUM_PASSWORD_LENGTH,
  INITIAL_FORM_VALUES,
  VALID_PASSWORD_REGEX,
  INPUT_TYPE,
} from "./constants";
import { renderPasswordVisibilityIcon } from "./utils";
import Validation from "./Validation";

const Form = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [inputType, setInputType] = useState(INPUT_TYPE.password);

  const { t } = useTranslation();

  const handleSubmit = () => {};

  return (
    <NeetoUIForm
      formikProps={{
        onSubmit: handleSubmit,
        initialValues: INITIAL_FORM_VALUES,
        validationSchema: VALIDATION_SCHEMA,
      }}
    >
      {({ dirty, errors, values: { password: passwordValue } }) => (
        <div className="space-y-5">
          <Input
            className="w-3/4"
            label={t("input.password")}
            name="password"
            placeholder={t("placeholder.enterPassword")}
            type={inputType}
            error={errors.password?.includes(
              t("validation.required", { entity: t("input.password") })
            )}
            suffix={renderPasswordVisibilityIcon({
              setInputType,
              setIsPasswordHidden,
              isPasswordHidden,
            })}
          />
          <div className="neeto-ui-text-gray-500">
            <Validation
              isValid={passwordValue.match(VALID_PASSWORD_REGEX)}
              message={t("validations.passwordFormat")}
            />
            <Validation
              isValid={passwordValue.length >= MINIMUM_PASSWORD_LENGTH}
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
