import axios from "axios";

import { PUBLIC_ARTICLES_BASE_URL } from "constants/routes";

const fetch = params => axios.get(PUBLIC_ARTICLES_BASE_URL, { params });

const show = slug => axios.get(`${PUBLIC_ARTICLES_BASE_URL}/${slug}`);

const articlesApi = { fetch, show };

export default articlesApi;
