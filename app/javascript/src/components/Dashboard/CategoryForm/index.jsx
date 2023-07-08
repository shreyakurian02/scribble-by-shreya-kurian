import React from "react";

import { Modal, Typography, Button } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  useCreateCategory,
  useUpdateCategory,
} from "hooks/reactQuery/useCategoriesApi";

import { VALIDATION_SCHEMA, INITIAL_VALUES } from "./constants";

const CategoryForm = ({
  isOpen,
  onClose,
  selectedCategory = {},
  isEdit = false,
}) => {
  const { t } = useTranslation();
  const { mutate: createCategory } = useCreateCategory({ onSuccess: onClose });
  const { mutate: updateCategory } = useUpdateCategory({ onSuccess: onClose });

  const { name: selectedCategoryName, id: selectedCategoryId } =
    selectedCategory;

  const initialValues = isEdit
    ? { category: selectedCategoryName }
    : INITIAL_VALUES;

  const handleSubmit = ({ category }, { setSubmitting }) => {
    const payload = { name: category };
    isEdit
      ? updateCategory(
          { id: selectedCategoryId, payload },
          { onSettled: () => setSubmitting(false) }
        )
      : createCategory(payload, { onSettled: () => setSubmitting(false) });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Typography style="h2">
          {isEdit
            ? t("headers.editCategoryHeader")
            : t("headers.addCategoryHeader")}
        </Typography>
      </Modal.Header>
      <Form
        formikProps={{
          initialValues,
          onSubmit: handleSubmit,
          onReset: onClose,
          validationSchema: VALIDATION_SCHEMA,
        }}
      >
        {({ isSubmitting, dirty }) => (
          <>
            <Modal.Body className="space-y-2">
              <Input
                label={t("input.categoryTitle")}
                name="category"
                placeholder={t("placeholder.addCategory")}
              />
            </Modal.Body>
            <Modal.Footer className="space-x-2">
              <Button
                disabled={!dirty || isSubmitting}
                label={t("button.add")}
                loading={isSubmitting}
                type="submit"
              />
              <Button label={t("button.cancel")} style="text" type="reset" />
            </Modal.Footer>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default CategoryForm;
