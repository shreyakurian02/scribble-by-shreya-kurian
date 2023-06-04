import axios from "axios";

import { ARTICLES_BASE_URL } from "constants";

const fetch = params => axios.get(ARTICLES_BASE_URL, { params });

const create = payload => axios.post(ARTICLES_BASE_URL, { article: payload });

const destroy = articleSlug =>
  axios.delete(`${ARTICLES_BASE_URL}/${articleSlug}`);

const articlesApi = { fetch, create, destroy };

export default articlesApi;
