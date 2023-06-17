import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import AddCategory from "components/Dashboard/CategoryForm";
import { useCategoriesState } from "contexts/categories";

import List from "./List";

import Header from "../Header";

const ManageCategories = () => {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const { t } = useTranslation();

  const categories = useCategoriesState();

  return (
    <div className="mx-auto w-1/2 space-y-5 py-16">
      <div className="space-y-3 pl-4">
        <Header
          subtitle={t("settings.manageCategoriesSubtitle")}
          title={t("settings.manageCategories")}
        />
        <div className="flex justify-between">
          <Typography className="neeto-ui-text-gray-500">
            {t("common.categoryWithCount", { count: categories.length })}
          </Typography>
          <Button
            icon={Plus}
            iconPosition="left"
            label={t("headers.addCategoryHeader")}
            style="link"
            onClick={() => setIsAddCategoryModalOpen(true)}
          />
        </div>
      </div>
      <List />
      <AddCategory
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
      />
    </div>
  );
};

export default ManageCategories;
