import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography, Spinner } from "neetoui";
import { MenuBar as NeetoUIMenuBar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { v4 as uuid } from "uuid";

import { PLURAL } from "constants";

import { STATUS_MENU_BLOCKS } from "./constants";
import {
  pushURLSearchParams,
  getSearchParams,
  handleFilterByCategories,
} from "./utils";

const { Block, SubTitle, Search: MenuSearch } = NeetoUIMenuBar;

const MenuBar = ({
  articlesCount,
  setCategorySearchTerm,
  categorySearchTerm,
  categories,
  showMenu,
  isCategoriesLoading,
  setIsNewCategoryModalOpen,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  const history = useHistory();
  const { t } = useTranslation();

  const { status, categories: queryCategories } = getSearchParams();

  const handleAddCategory = () =>
    setIsNewCategoryModalOpen(isModalOpen => !isModalOpen);

  const handleSearch = () => setIsSearchCollapsed(false);

  const handleCollapse = () => {
    setCategorySearchTerm("");
    setIsSearchCollapsed(true);
  };

  return (
    <NeetoUIMenuBar showMenu={showMenu} title={t("common.article", PLURAL)}>
      {STATUS_MENU_BLOCKS.map(({ label, value }) => (
        <Block
          active={status === value}
          count={articlesCount[value]}
          key={uuid()}
          label={label}
          onClick={() => pushURLSearchParams(history, "status", value)}
        />
      ))}
      <SubTitle
        iconProps={[
          { icon: Search, onClick: handleSearch },
          { icon: Plus, onClick: handleAddCategory },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          {t("common.category", PLURAL)}
        </Typography>
      </SubTitle>
      <MenuSearch
        autoFocus
        collapse={isSearchCollapsed}
        placeholder={t("placeholder.searchCategory")}
        value={categorySearchTerm}
        onChange={({ target: { value } }) => setCategorySearchTerm(value)}
        onCollapse={handleCollapse}
      />
      {isCategoriesLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        categories?.map(({ name, id, articles_count: articlesCount }) => (
          <Block
            active={queryCategories?.includes(name)}
            count={articlesCount}
            key={id}
            label={name}
            onClick={() =>
              handleFilterByCategories({
                queryCategories,
                history,
                selectedCategory: name,
              })
            }
          />
        ))
      )}
    </NeetoUIMenuBar>
  );
};

export default MenuBar;
