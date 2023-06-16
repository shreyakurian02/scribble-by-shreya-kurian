import React, { useState } from "react";

import { SubHeader as NeetoUISubHeader } from "neetoui/layouts";

import BulkDelete from "./BulkDelete";
import BulkUpdate from "./BulkUpdate";
import Columns from "./Columns";
import { DEFAULT_BULK_UPDATE_VALUES } from "./constants";
import LeftActionBlock from "./LeftActionBlock";

const SubHeader = ({
  filteredColumns,
  setFilteredColumns,
  articlesCount = 0,
  refetchArticles,
  setSelectedArticles,
  selectedArticles,
}) => {
  const [isBulkDeleteAlertOpen, setIsBulkDeleteAlertOpen] = useState(false);
  const [bulkUpdateData, setBulkUpdateData] = useState(
    DEFAULT_BULK_UPDATE_VALUES
  );

  const selectedRowsCount = selectedArticles.length;

  return (
    <>
      <NeetoUISubHeader
        className="pl-2"
        leftActionBlock={
          <LeftActionBlock
            articlesCount={articlesCount}
            selectedRowsCount={selectedRowsCount}
            setBulkUpdateData={setBulkUpdateData}
            setIsBulkDeleteAlertOpen={setIsBulkDeleteAlertOpen}
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
      <BulkDelete
        isOpen={isBulkDeleteAlertOpen}
        refetchArticles={refetchArticles}
        selectedArticles={selectedArticles}
        setSelectedArticles={setSelectedArticles}
        onClose={() => setIsBulkDeleteAlertOpen(false)}
      />
      <BulkUpdate
        bulkUpdateData={bulkUpdateData}
        refetchArticles={refetchArticles}
        selectedArticles={selectedArticles}
        setSelectedArticles={setSelectedArticles}
        onClose={() => setBulkUpdateData(DEFAULT_BULK_UPDATE_VALUES)}
      />
    </>
  );
};

export default SubHeader;
