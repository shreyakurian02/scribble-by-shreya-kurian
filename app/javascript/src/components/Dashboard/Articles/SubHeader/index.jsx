import React from "react";

import { SubHeader as NeetoUISubHeader } from "neetoui/layouts";

import LeftActionBlock from "./LeftActionBlock";

import Columns from "../Columns";

const SubHeader = ({
  selectedRowIds,
  filteredColumns,
  setFilteredColumns,
  articlesCount = 0,
}) => {
  const selectedRowsCount = selectedRowIds.length;

  return (
    <NeetoUISubHeader
      className="pl-2"
      leftActionBlock={
        <LeftActionBlock
          articlesCount={articlesCount}
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
