import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS, STALE_TIME } from "src/constants/query";

import categoriesApi from "apis/public/categories";

const { PUBLIC_CATEGORIES_LIST } = QUERY_KEYS;

export const useFetchCategories = options =>
  useQuery(PUBLIC_CATEGORIES_LIST, categoriesApi.fetch, {
    select: ({ data }) => data.categories,
    ...options,
  });
