import { useMutation } from "react-query";

import sessionApi from "apis/public/session";

export const useCreateSession = options =>
  useMutation(sessionApi.login, options);
