import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar as NeetoUIMenuBar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

import { PLURAL } from "constants";

import { STATUS_MENU_BLOCKS } from "./constants";

const { Block, SubTitle, Search: MenuSearch } = NeetoUIMenuBar;

const MenuBar = ({
  articlesCount,
  categories,
  showMenu,
  setIsNewCategoryModalOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  const { t } = useTranslation();

  const handleAddCategory = () =>
    setIsNewCategoryModalOpen(isModalOpen => !isModalOpen);

  const handleSearch = () => setIsSearchCollapsed(false);

  const handleCollapse = () => {
    setSearchTerm("");
    setIsSearchCollapsed(true);
  };

  return (
    <NeetoUIMenuBar showMenu={showMenu} title={t("common.article", PLURAL)}>
      {STATUS_MENU_BLOCKS.map(({ label, value }) => (
        <Block count={articlesCount[value]} key={uuid()} label={label} />
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
        value={searchTerm}
        onChange={({ target: { value } }) => setSearchTerm(value)}
        onCollapse={handleCollapse}
      />
      {categories?.map(({ name, id, articles_count: articlesCount }) => (
        <Block count={articlesCount} key={id} label={name} />
      ))}
    </NeetoUIMenuBar>
  );
};

export default MenuBar;
