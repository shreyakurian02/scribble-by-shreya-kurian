import React, { useEffect, useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { MenuBar, Header, Container } from "neetoui/layouts";

import EmptyState from "components/Common/EmptyState";

const Articles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => setArticles([]), []);

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
            onChange: ({ target: value }) => setSearchTerm(value),
            value: searchTerm,
          }}
        />
        {articles.length ? (
          <>Table</>
        ) : (
          <EmptyState
            actionLabel="Add article"
            subTitle="You have not yet creted an article. Create an article using the CTA given below."
            title="There are no articles."
          />
        )}
      </Container>
    </>
  );
};

export default Articles;
