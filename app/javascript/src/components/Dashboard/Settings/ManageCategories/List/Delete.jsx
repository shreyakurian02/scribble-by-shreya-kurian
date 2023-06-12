import React, { useState, useEffect, useMemo } from "react";

import { Warning } from "neetoicons";
import { Alert, Callout, Select, Typography } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import categoriesApi from "apis/categories";
import { getCategoryOptions } from "components/Dashboard/utils";
import { SINGULAR } from "constants";
import { useCategories } from "contexts/categories";

const Delete = ({ isOpen, onClose, category }) => {
  const [selectedCategory, setSelectedCategory] = useState({});

  const { t } = useTranslation();
  const [categories, fetchCategories] = useCategories();

  const { name, articles_count: articlesCount, id: categoryId } = category;
  const isLastCategory = categories.length === 1;

  const moveToCategories = useMemo(
    () => categories.filter(category => category.id !== categoryId),
    [categories]
  );

  useEffect(() => {
    setSelectedCategory({
      label: moveToCategories?.[0]?.name,
      value: moveToCategories?.[0]?.id,
    });
  }, [moveToCategories]);

  const handleSubmit = async () => {
    try {
      const params = { move_to_category_id: selectedCategory.value };
      await categoriesApi.destroy({ id: categoryId, params });
      fetchCategories();
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Alert
      isOpen={isOpen}
      submitButtonLabel={t("button.proceed")}
      message={
        <div className="space-y-2">
          <Trans i18nKey="alert.deleteMessage" values={{ title: name }} />
          {articlesCount > 0 && (
            <>
              <Callout icon={Warning} style="danger">
                <Typography style="body2">
                  <Trans
                    i18nKey={
                      isLastCategory
                        ? "alert.deleteLastCategoryWarning"
                        : "alert.deleteCategoryWarning"
                    }
                    values={{
                      name,
                      articleWithCount: t("common.articleWithCount", {
                        count: articlesCount,
                      }),
                    }}
                  />
                </Typography>
              </Callout>
              {!isLastCategory && (
                <Select
                  required
                  defaultValue={selectedCategory}
                  label={t("input.selectCategory")}
                  options={getCategoryOptions(moveToCategories)}
                  size="large"
                  onChange={category => setSelectedCategory(category)}
                />
              )}
            </>
          )}
        </div>
      }
      title={t("alert.deleteEntity", {
        entity: t("common.category", SINGULAR).toLowerCase(),
      })}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default Delete;
