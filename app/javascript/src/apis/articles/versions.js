import axios from "axios";

import { ARTICLES_BASE_URL } from "constants/routes";

const show = ({ versionId, articleId }) =>
  axios.get(`${ARTICLES_BASE_URL}/${articleId}/versions/${versionId}`);

const restore = ({ versionId, articleId }) =>
  axios.put(`${ARTICLES_BASE_URL}/${articleId}/versions/${versionId}/restore`);

const versionsApi = { show, restore };

export default versionsApi;
