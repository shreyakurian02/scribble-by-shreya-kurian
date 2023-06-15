import axios from "axios";

import { ARTICLES_BASE_URL, BULK_ARTICLES_BASE_URL } from "constants/routes";

const fetch = params => axios.get(ARTICLES_BASE_URL, { params });

const create = payload => axios.post(ARTICLES_BASE_URL, { article: payload });

const show = slug => axios.get(`${ARTICLES_BASE_URL}/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`${ARTICLES_BASE_URL}/${slug}`, { article: payload });

const destroy = articleSlug =>
  axios.delete(`${ARTICLES_BASE_URL}/${articleSlug}`);

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
