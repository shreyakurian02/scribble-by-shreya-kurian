import React, { useState } from "react";

import classnames from "classnames";
import { Table, PageLoader } from "neetoui";
import { isEmpty, pluck } from "ramda";

import { Update, Delete } from "./Actions";
import SubHeader from "./SubHeader";

import {
  MANAGE_DELETE_ALERT_INITIAL_VALUE,
  MANAGE_UPDATE_MODAL_INITIAL_VALUE,
} from "../constants";
import EmptyState from "../EmptyState";
import { getAllowedColumns, getColumnData } from "../utils";

const List = ({
  articlesData,
  refetchArticles,
  isArticlesLoading,
  setSearchTerm,
  setPageProperties,
  pageProperties,
}) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(
    pluck("dataIndex", getColumnData())
  );

  const [manageUpdateModal, setManageUpdateModal] = useState(
    MANAGE_UPDATE_MODAL_INITIAL_VALUE
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
        filteredColumns={filteredColumns}
        refetchArticles={refetchArticles}
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
          setManageUpdateModal,
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
      <Update
        manageUpdateModal={manageUpdateModal}
        refetchArticles={refetchArticles}
        onClose={() => setManageUpdateModal(MANAGE_UPDATE_MODAL_INITIAL_VALUE)}
      />
    </>
  );
};

export default List;
