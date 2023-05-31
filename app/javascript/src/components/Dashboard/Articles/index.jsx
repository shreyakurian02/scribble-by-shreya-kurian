import React, { useEffect, useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { MenuBar, Header, Container } from "neetoui/layouts";

import { ARTICLES } from "./constants";
import List from "./List";

const Articles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => setArticles(ARTICLES), []);

  return (
    <>
      <MenuBar showMenu={isMenuOpen} title="Articles">
        <MenuBar.Block active count={0} label="All" />
        <MenuBar.Block count={0} label="Published" />
        <MenuBar.Block count={0} label="Draft" />
        <MenuBar.SubTitle iconProps={[{ icon: Search }, { icon: Plus }]}>
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            Categories
          </Typography>
        </MenuBar.SubTitle>
      </MenuBar>
      <Container>
        <Header
          actionBlock={<Button label="Add article" />}
          menuBarToggle={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}
          title="All articles"
          searchProps={{
            placeholder: "Search article titles",
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
