import React, { useState, useEffect } from "react";

import classnames from "classnames";
import { Table, Typography } from "neetoui";
import { Header, Container, SubHeader } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";
import { DEFAULT_PAGE_PROPERTIES } from "components/Dashboard/constants";

import { COLUMN_DATA, SORT_ORDER } from "./constants";

const Analytics = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState({ data: [], count: 0 });
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.descend);
  const [pageProperties, setPageProperties] = useState(DEFAULT_PAGE_PROPERTIES);

  const { size: pageSize, page: currentPageNumber } = pageProperties;

  const handleSort = ({ order }) =>
    setSortOrder(order === "descend" ? SORT_ORDER.descend : SORT_ORDER.ascend);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const {
        data: {
          articles,
          articles_count: { all },
        },
      } = await articlesApi.fetch({
        order_by: "views",
        sort_order: sortOrder,
        per_page: pageSize,
        page_number: currentPageNumber,
      });
      setArticles({ data: articles, count: all });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [sortOrder, pageProperties]);

  return (
    <Container>
      <Header title={t("common.analytics")} />
      <SubHeader
        leftActionBlock={
          <Typography style="h4">
            {t("common.articleWithCount", { count: articles.count })}
          </Typography>
        }
      />
      <Table
        fixedHeight
        columnData={COLUMN_DATA}
        currentPageNumber={currentPageNumber}
        defaultPageSize={pageSize}
        handlePageChange={(page, size) => setPageProperties({ page, size })}
        loading={isLoading}
        rowData={articles.data}
        shouldDynamicallyRenderRowSize={false}
        totalCount={articles.count}
        rowClassName={(_, index) =>
          classnames({ "neeto-ui-bg-gray-200": index % 2 !== 0 })
        }
        onChange={(_, __, sorter) => handleSort(sorter)}
      />
    </Container>
  );
};

export default Analytics;
