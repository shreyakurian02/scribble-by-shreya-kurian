import React from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const Articles = () => (
  <MenuBar showMenu title="Articles">
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
);

export default Articles;
