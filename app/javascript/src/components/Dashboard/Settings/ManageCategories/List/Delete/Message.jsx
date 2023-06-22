import React, { useEffect, useMemo } from "react";

import { Warning } from "neetoicons";
import { Callout, Select, Typography } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import { getCategoryOptions } from "components/Dashboard/utils";
import { useCategoriesState } from "contexts/categories";

const Message = ({
  selectedMoveToCategory,
  setSelectedMoveToCategory,
  selectedCategory,
}) => {
  const { t } = useTranslation();
  const categories = useCategoriesState();

  const isLastCategory = categories.length === 1;
  const {
    name,
    articles_count: articlesCount,
    id: selectedCategoryId,
  } = selectedCategory;

  const moveToCategories = useMemo(
    () => categories.filter(category => category.id !== selectedCategoryId),
    [categories]
  );

  useEffect(() => {
    setSelectedMoveToCategory({
      label: moveToCategories?.[0]?.name,
      value: moveToCategories?.[0]?.id,
    });
  }, [moveToCategories]);

  return (
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
              label={t("input.selectCategory")}
              options={getCategoryOptions(moveToCategories)}
              size="large"
              value={selectedMoveToCategory}
              onChange={category => setSelectedMoveToCategory(category)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Message;
