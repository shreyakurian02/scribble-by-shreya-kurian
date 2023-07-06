import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/constants/query";

import versionsApi from "apis/articles/versions";

const { VERSION, ARTICLE } = QUERY_KEYS;

export const useShowVersion = ({ versionId, articleId }, options) =>
  useQuery(
    [VERSION, versionId, articleId],
    () => versionsApi.show({ versionId, articleId }),
    {
      select: ({ data }) => data?.version,
      enabled: !!versionId && !!articleId,
      ...options,
    }
  );

export const useRestoreVersion = (articleId, options) => {
  const queryClient = useQueryClient();

  return useMutation(versionsApi.restore, {
    onSuccess: () => {
      queryClient.invalidateQueries([ARTICLE, articleId]);
      options?.onSuccess?.();
    },
  });
};
