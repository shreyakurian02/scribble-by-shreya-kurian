import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/constants/query";

import siteApi from "apis/site";

const { SITE } = QUERY_KEYS;

export const useShowSite = options =>
  useQuery(SITE, siteApi.show, {
    select: ({ data }) => data?.site,
    ...options,
  });

export const useUpdateSite = options => {
  const queryClient = useQueryClient();

  return useMutation(siteApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(SITE);
      options?.onSuccess?.();
    },
  });
};
