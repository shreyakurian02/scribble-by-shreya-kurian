import { useQuery } from "react-query";
import { QUERY_KEYS, STALE_TIME } from "src/constants/query";

import articlesApi from "apis/public/articles";

const { PUBLIC_ARTICLES_LIST, PUBLIC_ARTICLE } = QUERY_KEYS;

export const useFetchArticles = (params = {}) =>
  useQuery([PUBLIC_ARTICLES_LIST, params], () => articlesApi.fetch(params), {
    select: ({ data }) => data.articles,
    enabled: !!params.search,
  });

export const useShowArticle = (articleSlug, options) =>
  useQuery([PUBLIC_ARTICLE, articleSlug], () => articlesApi.show(articleSlug), {
    select: ({ data }) => data?.article,
    enabled: !!articleSlug,
    ...options,
  });
