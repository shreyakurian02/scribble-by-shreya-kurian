import axios from "axios";

import { CATEGORIES_BASE_URL } from "constants";

const fetch = () => axios.get(CATEGORIES_BASE_URL);

const create = payload =>
  axios.post(CATEGORIES_BASE_URL, { category: payload });

const categoriesApi = { fetch, create };

export default categoriesApi;
