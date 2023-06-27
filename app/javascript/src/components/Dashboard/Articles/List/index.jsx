import React, { useState } from "react";

import classnames from "classnames";
import { Table } from "neetoui";
import { isEmpty, pluck } from "ramda";

import { Update, Delete } from "./Actions";
import SubHeader from "./SubHeader";
import { getAllowedColumns, getColumnData } from "./utils";

import {
  MANAGE_DELETE_ALERT_INITIAL_VALUE,
  MANAGE_UPDATE_MODAL_INITIAL_VALUE,
} from "../constants";
import EmptyState from "../EmptyState";

const List = ({
  articles: articlesData,
  refetchArticles,
  isArticlesLoading,
  setArticleSearchTerm,
  setPageProperties,
  pageProperties,
}) => {
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(
    pluck("dataIndex", getColumnData())
  );

  const [manageUpdateModal, setManageUpdateModal] = useState(
    MANAGE_UPDATE_MODAL_INITIAL_VALUE
  );

  const [manageDeleteAlert, setManageDeleteAlert] = useState(
    MANAGE_DELETE_ALERT_INITIAL_VALUE
  );

  const { size: pageSize, page: currentPageNumber } = pageProperties;
  const {
    articles,
    count: { filtered: filteredArticlesCount },
  } = articlesData;

  if (isEmpty(articles) && !isArticlesLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <EmptyState setArticleSearchTerm={setArticleSearchTerm} />
      </div>
    );
  }

  return (
    <>
      <SubHeader
        articlesCount={filteredArticlesCount}
        filteredColumns={filteredColumns}
        refetchArticles={refetchArticles}
        selectedArticles={selectedArticles}
        setFilteredColumns={setFilteredColumns}
        setSelectedArticles={setSelectedArticles}
      />
      <Table
        fixedHeight
        rowSelection
        currentPageNumber={currentPageNumber}
        defaultPageSize={pageSize}
        handlePageChange={(page, size) => setPageProperties({ page, size })}
        loading={isArticlesLoading}
        rowData={articles}
        scroll={{ x: 0 }}
        selectedRowKeys={pluck("id", selectedArticles)}
        shouldDynamicallyRenderRowSize={false}
        totalCount={filteredArticlesCount}
        columnData={getAllowedColumns({
          filteredColumns,
          setManageDeleteAlert,
          setManageUpdateModal,
        })}
        rowClassName={(_, index) =>
          classnames({ "neeto-ui-bg-gray-200": index % 2 !== 0 })
        }
        onRowSelect={(_, selectedRows) => setSelectedArticles(selectedRows)}
      />
      <Delete
        manageDeleteAlert={manageDeleteAlert}
        refetchArticles={refetchArticles}
        setSelectedArticles={setSelectedArticles}
        onClose={() => setManageDeleteAlert(MANAGE_DELETE_ALERT_INITIAL_VALUE)}
      />
      <Update
        manageUpdateModal={manageUpdateModal}
        refetchArticles={refetchArticles}
        setSelectedArticles={setSelectedArticles}
        onClose={() => setManageUpdateModal(MANAGE_UPDATE_MODAL_INITIAL_VALUE)}
      />
    </>
  );
};

export default List;
