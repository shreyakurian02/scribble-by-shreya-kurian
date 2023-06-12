import axios from "axios";

import { CATEGORIES_BASE_URL } from "constants";

const fetch = params => axios.get(CATEGORIES_BASE_URL, { params });

const create = payload =>
  axios.post(CATEGORIES_BASE_URL, { category: payload });

const update = ({ id, payload }) =>
  axios.put(`${CATEGORIES_BASE_URL}/${id}`, payload);

const destroy = ({ id, params }) =>
  axios.delete(`${CATEGORIES_BASE_URL}/${id}`, { params });

const reorder = ({ id, payload }) =>
  axios.patch(`${CATEGORIES_BASE_URL}/${id}/reorder`, { category: payload });

const categoriesApi = { fetch, create, reorder, destroy, update };

export default categoriesApi;
