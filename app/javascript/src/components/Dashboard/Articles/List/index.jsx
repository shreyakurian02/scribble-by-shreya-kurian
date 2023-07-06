import React, { useState } from "react";

import classnames from "classnames";
import { Table } from "neetoui";
import { isEmpty, pluck } from "ramda";

import { useFetchArticles } from "hooks/reactQuery/useArticlesApi";

import { Update, Delete } from "./Actions";
import SubHeader from "./SubHeader";
import { getAllowedColumns, getColumnData } from "./utils";

import {
  MANAGE_DELETE_ALERT_INITIAL_VALUE,
  MANAGE_UPDATE_MODAL_INITIAL_VALUE,
} from "../constants";
import EmptyState from "../EmptyState";
import { getQueryParams } from "../utils";

const List = ({ setArticleSearchTerm, setPageProperties, pageProperties }) => {
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

  const { status, categories: queryCategories, search } = getQueryParams();
  const { size: pageSize, page: currentPageNumber } = pageProperties;

  const {
    isFetching: isArticlesLoading,
    data: {
      articles,
      articles_count: { filtered: filteredArticlesCount } = {},
    } = {},
  } = useFetchArticles({
    status,
    search,
    categories: queryCategories,
    per_page: pageSize,
    page_number: currentPageNumber,
  });

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
        setSelectedArticles={setSelectedArticles}
        onClose={() => setManageDeleteAlert(MANAGE_DELETE_ALERT_INITIAL_VALUE)}
      />
      <Update
        manageUpdateModal={manageUpdateModal}
        setSelectedArticles={setSelectedArticles}
        onClose={() => setManageUpdateModal(MANAGE_UPDATE_MODAL_INITIAL_VALUE)}
      />
    </>
  );
};

export default List;
