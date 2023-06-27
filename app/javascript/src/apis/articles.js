import axios from "axios";

import { ARTICLES_BASE_URL, BULK_ARTICLES_BASE_URL } from "constants/routes";

const fetch = params => axios.get(ARTICLES_BASE_URL, { params });

const create = payload => axios.post(ARTICLES_BASE_URL, { article: payload });

const show = id => axios.get(`${ARTICLES_BASE_URL}/${id}`);

const update = ({ id, payload }) =>
  axios.put(`${ARTICLES_BASE_URL}/${id}`, { article: payload });

const destroy = id => axios.delete(`${ARTICLES_BASE_URL}/${id}`);

const bulkDestroy = params => axios.delete(BULK_ARTICLES_BASE_URL, { params });

const bulkUpdate = ({ ids, payload }) =>
  axios.put(BULK_ARTICLES_BASE_URL, { article: payload, ids });

const articlesApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  bulkDestroy,
  bulkUpdate,
};

export default articlesApi;
