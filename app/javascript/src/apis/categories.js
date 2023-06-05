import axios from "axios";

import { CATEGORIES_BASE_URL } from "constants";

const fetch = params => axios.get(CATEGORIES_BASE_URL, { params });

const create = payload =>
  axios.post(CATEGORIES_BASE_URL, { category: payload });

const categoriesApi = { fetch, create };

export default categoriesApi;
