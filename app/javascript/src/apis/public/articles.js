import axios from "axios";

import { PUBLIC_ARTICLES_BASE_URL } from "constants/routes";

const show = slug => axios.get(`${PUBLIC_ARTICLES_BASE_URL}/${slug}`);

const articlesApi = { show };

export default articlesApi;
