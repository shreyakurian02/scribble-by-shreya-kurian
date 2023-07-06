import { QueryClient, QueryCache } from "react-query";

import { STALE_TIME } from "constants/query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
    },
  },
  queryCache: new QueryCache(),
});

export default queryClient;
