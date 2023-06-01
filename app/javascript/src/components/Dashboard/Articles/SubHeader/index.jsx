import React from "react";

import { SubHeader as NeetoUISubHeader } from "neetoui/layouts";

import LeftActionBlock from "./LeftActionBlock";

import Columns from "../Columns";

const SubHeader = ({
  selectedRowIds,
  filteredColumns,
  setFilteredColumns,
  articleCount = 0,
}) => {
  const selectedRowsCount = selectedRowIds.length;

  return (
    <NeetoUISubHeader
      className="pl-2"
      leftActionBlock={
        <LeftActionBlock
          articleCount={articleCount}
          selectedRowsCount={selectedRowsCount}
        />
      }
      rightActionBlock={
        selectedRowsCount === 0 && (
          <Columns
            filteredColumns={filteredColumns}
            setFilteredColumns={setFilteredColumns}
          />
        )
      }
    />
  );
};

export default SubHeader;
