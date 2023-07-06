import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS, STALE_TIME } from "src/constants/query";

import siteApi from "apis/public/site";

const { PUBLIC_SITE } = QUERY_KEYS;

export const useShowSite = options =>
  useQuery(PUBLIC_SITE, siteApi.show, {
    select: ({ data }) => data?.site,
    ...options,
  });
