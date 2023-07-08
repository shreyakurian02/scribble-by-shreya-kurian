import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/constants/query";

import categoriesApi from "apis/categories";

const { CATEGORIES_LIST } = QUERY_KEYS;

export const useFetchCategories = (categorySearchTerm, options) =>
  useQuery(
    [CATEGORIES_LIST, categorySearchTerm],
    () => categoriesApi.fetch(categorySearchTerm),
    {
      keepPreviousData: true,
      select: ({ data }) => data.categories,
      ...options,
    }
  );

export const useCreateCategory = options => {
  const queryClient = useQueryClient();

  return useMutation(categoriesApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(CATEGORIES_LIST);
      options?.onSuccess?.();
    },
  });
};

export const useUpdateCategory = options => {
  const queryClient = useQueryClient();

  return useMutation(categoriesApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(CATEGORIES_LIST);
      options?.onSuccess?.();
    },
  });
};

export const useDestroyCategory = options => {
  const queryClient = useQueryClient();

  return useMutation(categoriesApi.destroy, {
    onSuccess: () => {
      queryClient.invalidateQueries(CATEGORIES_LIST);
      options?.onSuccess?.();
    },
  });
};
