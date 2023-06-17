import React from "react";

import { Modal, Typography, Button } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";
import { useCategoriesDispatch } from "contexts/categories";

import { VALIDATION_SCHEMA, INITIAL_VALUES } from "./constants";

const CategoryForm = ({
  isOpen,
  onClose,
  selectedCategory = {},
  isEdit = false,
}) => {
  const { t } = useTranslation();

  const fetchCategories = useCategoriesDispatch();

  const { name: selectedCategoryName, id: selectedCategoryId } =
    selectedCategory;

  const initialValues = isEdit
    ? { category: selectedCategoryName }
    : INITIAL_VALUES;

  const handleSubmit = async ({ category }) => {
    try {
      const payload = { name: category };
      isEdit
        ? await categoriesApi.update({ id: selectedCategoryId, payload })
        : await categoriesApi.create(payload);
      fetchCategories();
      onClose();
    } catch (error) {
      logger.error(error);
    }
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
        {({ dirty }) => (
          <>
            <Modal.Body className="space-y-2">
              <Input
                label={t("input.categoryTitle")}
                name="category"
                placeholder={t("placeholder.addCategory")}
              />
            </Modal.Body>
            <Modal.Footer className="space-x-2">
              <Button disabled={!dirty} label={t("button.add")} type="submit" />
              <Button label={t("button.cancel")} style="text" type="reset" />
            </Modal.Footer>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default CategoryForm;
