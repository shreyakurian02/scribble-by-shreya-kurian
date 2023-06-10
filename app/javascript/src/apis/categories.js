import axios from "axios";

import { CATEGORIES_BASE_URL } from "constants";

const fetch = params => axios.get(CATEGORIES_BASE_URL, { params });

const create = payload =>
  axios.post(CATEGORIES_BASE_URL, { category: payload });

const reorder = ({ id, payload }) =>
  axios.patch(`${CATEGORIES_BASE_URL}/${id}/reorder`, { category: payload });

const categoriesApi = { fetch, create, reorder };

export default categoriesApi;
