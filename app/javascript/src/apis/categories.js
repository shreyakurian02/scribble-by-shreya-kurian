import axios from "axios";

import { CATEGORIES_BASE_URL } from "constants/routes";

const fetch = params => axios.get(CATEGORIES_BASE_URL, { params });

const create = payload =>
  axios.post(CATEGORIES_BASE_URL, { category: payload });

const update = ({ id, payload, quiet = false }) => {
  const path = quiet
    ? `${CATEGORIES_BASE_URL}/${id}?quiet`
    : `${CATEGORIES_BASE_URL}/${id}`;

  return axios.put(path, payload);
};

const destroy = ({ id, params }) =>
  axios.delete(`${CATEGORIES_BASE_URL}/${id}`, { params });

const categoriesApi = { fetch, create, destroy, update };

export default categoriesApi;
