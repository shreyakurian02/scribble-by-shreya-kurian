import React, { useState } from "react";

import { SubHeader as NeetoUISubHeader } from "neetoui/layouts";

import BulkDelete from "./BulkDelete";
import BulkUpdate from "./BulkUpdate";
import Columns from "./Columns";
import LeftActionBlock from "./LeftActionBlock";

const SubHeader = ({
  categories,
  selectedRowIds,
  filteredColumns,
  setFilteredColumns,
  articlesCount = 0,
  refetchCategories,
  refetchArticles,
  setSelectedRowIds,
}) => {
  const [isBulkDeleteAlertOpen, setIsBulkDeleteAlertOpen] = useState(false);
  const [bulkUpdateData, setBulkUpdateData] = useState({
    isModalOpen: false,
    payload: {},
    type: "",
  });

  const selectedRowsCount = selectedRowIds.length;

  return (
    <>
      <NeetoUISubHeader
        className="pl-2"
        leftActionBlock={
          <LeftActionBlock
            articlesCount={articlesCount}
            categories={categories}
            refetchArticles={refetchArticles}
            selectedRowIds={selectedRowIds}
            selectedRowsCount={selectedRowsCount}
            setBulkUpdateData={setBulkUpdateData}
            setIsBulkDeleteAlertOpen={setIsBulkDeleteAlertOpen}
            setSelectedRowIds={setSelectedRowIds}
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
        refetchCategories={refetchCategories}
        selectedRowIds={selectedRowIds}
        onClose={() => setIsBulkDeleteAlertOpen(false)}
      />
      <BulkUpdate
        bulkUpdateData={bulkUpdateData}
        refetchArticles={refetchArticles}
        refetchCategories={refetchCategories}
        selectedRowIds={selectedRowIds}
        setSelectedRowIds={setSelectedRowIds}
        onClose={() =>
          setBulkUpdateData({ isModalOpen: false, payload: {}, type: "" })
        }
      />
    </>
  );
};

export default SubHeader;
