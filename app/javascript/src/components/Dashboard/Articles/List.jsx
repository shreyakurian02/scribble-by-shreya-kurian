import React, { useState } from "react";

import classnames from "classnames";
import { Table, PageLoader } from "neetoui";
import { isEmpty, pluck } from "ramda";

import Delete from "./Alert/Delete";
import { MANAGE_DELETE_ALERT_INITIAL_VALUE } from "./constants";
import EmptyState from "./EmptyState";
import SubHeader from "./SubHeader";
import { getAllowedColumns, getColumnData } from "./utils";

const List = ({
  refetchCategories,
  articlesData,
  refetchArticles,
  isArticlesLoading,
  setSearchTerm,
  categories,
  setPageProperties,
  pageProperties,
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
    count: { filtered: filteredArticlesCount, all: totalArticlesCount },
  } = articlesData;

  if (isArticlesLoading) {
    return (
      <div className="h-full w-full">
        <PageLoader />
      </div>
    );
  }

  if (isEmpty(articles)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <EmptyState setSearchTerm={setSearchTerm} />
      </div>
    );
  }

  return (
    <>
      <SubHeader
        articlesCount={filteredArticlesCount}
        categories={categories}
        filteredColumns={filteredColumns}
        refetchArticles={refetchArticles}
        refetchCategories={refetchCategories}
        selectedRowIds={selectedRowIds}
        setFilteredColumns={setFilteredColumns}
        setSelectedRowIds={setSelectedRowIds}
      />
      <Table
        fixedHeight
        rowSelection
        currentPageNumber={pageProperties.index}
        defaultPageSize={pageProperties.size}
        handlePageChange={(index, size) => setPageProperties({ index, size })}
        loading={isArticlesLoading}
        rowData={articles}
        scroll={{ x: 0 }}
        selectedRowKeys={selectedRowIds}
        shouldDynamicallyRenderRowSize={false}
        totalCount={totalArticlesCount}
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
