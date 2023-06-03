import axios from "axios";

import { ARTICLES_BASE_URL } from "constants";

const fetch = () => axios.get(ARTICLES_BASE_URL);

const create = payload => axios.post(ARTICLES_BASE_URL, { article: payload });

const articlesApi = { fetch, create };

export default articlesApi;
