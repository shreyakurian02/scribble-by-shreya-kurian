import React, { useState } from "react";

import { SubHeader as NeetoUISubHeader } from "neetoui/layouts";

import BulkDelete from "./BulkDelete";
import BulkUpdate from "./BulkUpdate";
import Columns from "./Columns";
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
  const [bulkUpdateData, setBulkUpdateData] = useState({
    isModalOpen: false,
    payload: {},
    type: "",
  });

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
            // setSelectedArticles={setSelectedArticles}
            // refetchArticles={refetchArticles}
            // selectedArticles={selectedArticles}
            // setSelectedArticles={setSelectedArticles}
            // selectedArticles={selectedArticles}
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
        onClose={() =>
          setBulkUpdateData({ isModalOpen: false, payload: {}, type: "" })
        }
      />
    </>
  );
};

export default SubHeader;
