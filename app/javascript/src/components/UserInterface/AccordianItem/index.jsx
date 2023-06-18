import React, { useState, useEffect } from "react";

import { Down, Right } from "neetoicons";
import { Typography } from "neetoui";

import List from "./List";

const AccordianItem = ({ category, isCategoryExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(isCategoryExpanded);

  const { name, articles } = category;

  useEffect(() => {
    setIsExpanded(isCategoryExpanded || isExpanded);
  }, [isCategoryExpanded]);

  return (
    <div className="mt-5 w-full">
      <div
        className="flex space-x-3"
        onClick={() => setIsExpanded(isExpanded => !isExpanded)}
      >
        {isExpanded ? <Down size={18} /> : <Right size={18} />}
        <Typography
          className="neeto-ui-font-semibold neeto-ui-text-gray-800"
          style="h5"
        >
          {name}
        </Typography>
      </div>
      {isExpanded && (
        <List articles={articles} isCategoryExpanded={isCategoryExpanded} />
      )}
    </div>
  );
};

export default AccordianItem;
