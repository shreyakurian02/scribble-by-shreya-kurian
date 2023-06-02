import React, { useEffect, useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { MenuBar, Header, Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { PLURAL, SINGULAR } from "constants";

import { ARTICLES } from "./constants";
import List from "./List";

const Articles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);

  const { t } = useTranslation();

  useEffect(() => setArticles(ARTICLES), []);

  return (
    <>
      <MenuBar showMenu={isMenuOpen} title={t("common.article", PLURAL)}>
        <MenuBar.Block active count={0} label={t("common.all")} />
        <MenuBar.Block count={0} label={t("common.published")} />
        <MenuBar.Block count={0} label={t("common.draft")} />
        <MenuBar.SubTitle iconProps={[{ icon: Search }, { icon: Plus }]}>
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            {t("common.category", PLURAL)}
          </Typography>
        </MenuBar.SubTitle>
      </MenuBar>
      <Container>
        <Header
          menuBarToggle={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}
          title={t("common.allArticles")}
          actionBlock={
            <Button
              to="/article/create"
              label={t("button.addEntity", {
                entity: t("common.article", SINGULAR),
              })}
            />
          }
          searchProps={{
            placeholder: t("placeholder.searchArticles"),
            onChange: ({ target: { value } }) => setSearchTerm(value),
            value: searchTerm,
          }}
        />
        <List articles={articles} />
      </Container>
    </>
  );
};

export default Articles;
