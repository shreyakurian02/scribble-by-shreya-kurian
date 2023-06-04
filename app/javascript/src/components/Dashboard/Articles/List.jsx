import React, { useState } from "react";

import classnames from "classnames";
import { Table } from "neetoui";
import { pluck } from "ramda";

import Delete from "./Alert/Delete";
import { MANAGE_DELETE_ALERT_INITIAL_VALUE } from "./constants";
import EmptyState from "./EmptyState";
import SubHeader from "./SubHeader";
import { getAllowedColumns, getColumnData } from "./utils";

const List = ({
  articlesData,
  refetchArticles,
  isArticlesLoading,
  setSearchTerm,
}) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(
    pluck("dataIndex", getColumnData())
  );

  const [manageDeleteAlert, setManageDeleteAlert] = useState(
    MANAGE_DELETE_ALERT_INITIAL_VALUE
  );

  const {
    articles,
    count: { filtered: articlesCount },
  } = articlesData;

  if (articlesCount === 0 && !isArticlesLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <EmptyState setSearchTerm={setSearchTerm} />
      </div>
    );
  }

  return (
    <>
      <SubHeader
        articlesCount={articlesCount}
        filteredColumns={filteredColumns}
        selectedRowIds={selectedRowIds}
        setFilteredColumns={setFilteredColumns}
      />
      <Table
        fixedHeight
        rowSelection
        loading={isArticlesLoading}
        rowData={articles}
        scroll={{ x: 0 }}
        selectedRowKeys={selectedRowIds}
        columnData={getAllowedColumns({
          filteredColumns,
          setManageDeleteAlert,
        })}
        rowClassName={(_, index) =>
          classnames({ "neeto-ui-bg-gray-200": index % 2 !== 0 })
        }
        onRowSelect={setSelectedRowIds}
      />
      <Delete
        manageDeleteAlert={manageDeleteAlert}
        refetchArticles={refetchArticles}
        onClose={() => setManageDeleteAlert(MANAGE_DELETE_ALERT_INITIAL_VALUE)}
      />
    </>
  );
};

export default List;
