import React from "react";

import { Modal, Typography, Button } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";

import {
  CATEGORY_VALIDATION_SCHEMA,
  NEW_CATEGORY_INITIAL_VALUES,
} from "./constants";

const AddCategory = ({ isOpen, onClose, refetchCategories }) => {
  const { t } = useTranslation();

  const handleSubmit = async ({ category }) => {
    try {
      const payload = { name: category };
      await categoriesApi.create(payload);
      refetchCategories();
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Typography style="h2">{t("common.addCategoryHeader")}</Typography>
      </Modal.Header>
      <Form
        formikProps={{
          onSubmit: handleSubmit,
          initialValues: NEW_CATEGORY_INITIAL_VALUES,
          validationSchema: CATEGORY_VALIDATION_SCHEMA,
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

export default AddCategory;
