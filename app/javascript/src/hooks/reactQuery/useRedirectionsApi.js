import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS, STALE_TIME } from "src/constants/query";

import redirectionsApi from "apis/redirections";

const { REDIRECTIONS_LIST } = QUERY_KEYS;

export const useFetchRedirections = options =>
  useQuery(REDIRECTIONS_LIST, redirectionsApi.fetch, {
    select: ({ data }) => data?.redirections,
    staleTime: STALE_TIME.SETTINGS,
    ...options,
  });

export const useCreateRedirection = options => {
  const queryClient = useQueryClient();

  return useMutation(redirectionsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries([REDIRECTIONS_LIST]);
      options?.onSuccess?.();
    },
  });
};

export const useUpdateRedirection = options => {
  const queryClient = useQueryClient();

  return useMutation(redirectionsApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries([REDIRECTIONS_LIST]);
      options?.onSuccess?.();
    },
  });
};

export const useDestroyRedirection = options => {
  const queryClient = useQueryClient();

  return useMutation(redirectionsApi.destroy, {
    onSuccess: () => {
      queryClient.invalidateQueries([REDIRECTIONS_LIST]);
      options?.onSuccess?.();
    },
  });
};
