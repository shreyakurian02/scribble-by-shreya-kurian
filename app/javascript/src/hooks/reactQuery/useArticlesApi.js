import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/constants/query";

import articlesApi from "apis/articles";

const { ARTICLES_LIST, ARTICLE, CATEGORIES_LIST } = QUERY_KEYS;

export const useFetchArticles = (params = {}) =>
  useQuery([ARTICLES_LIST, params], () => articlesApi.fetch(params), {
    select: ({ data }) => data,
  });

export const useCreateArticle = options => {
  const queryClient = useQueryClient();

  return useMutation(articlesApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(ARTICLES_LIST);
      queryClient.invalidateQueries(CATEGORIES_LIST);
      options?.onSuccess?.();
    },
  });
};

export const useUpdateArticle = (articleId, options) => {
  const queryClient = useQueryClient();

  return useMutation(articlesApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(ARTICLES_LIST);
      queryClient.invalidateQueries([ARTICLE, articleId]);
      options?.onSuccess?.();
    },
  });
};

export const useDestroyArticle = options => {
  const queryClient = useQueryClient();

  return useMutation(articlesApi.destroy, {
    onSuccess: () => {
      queryClient.invalidateQueries(ARTICLES_LIST);
      queryClient.invalidateQueries(CATEGORIES_LIST);
      options?.onSuccess?.();
    },
  });
};

export const useBulkDestroyArticles = options => {
  const queryClient = useQueryClient();

  return useMutation(articlesApi.bulkDestroy, {
    onSuccess: () => {
      queryClient.invalidateQueries(ARTICLES_LIST);
      queryClient.invalidateQueries(ARTICLE);
      queryClient.invalidateQueries(CATEGORIES_LIST);
      options?.onSuccess?.();
    },
  });
};

export const useBulkUpdateArticles = options => {
  const queryClient = useQueryClient();

  return useMutation(articlesApi.bulkUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(ARTICLES_LIST);
      queryClient.invalidateQueries(ARTICLE);
      queryClient.invalidateQueries(CATEGORIES_LIST);
      options?.onSuccess?.();
    },
  });
};

export const useShowArticle = (articleId, options) =>
  useQuery([ARTICLE, articleId], () => articlesApi.show(articleId), {
    select: ({ data }) => data?.article,
    enabled: !!articleId,
    ...options,
  });
