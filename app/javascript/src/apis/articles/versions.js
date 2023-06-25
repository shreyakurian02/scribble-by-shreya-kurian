import axios from "axios";

import { ARTICLES_BASE_URL } from "constants/routes";

const show = ({ versionId, articleSlug }) =>
  axios.get(`${ARTICLES_BASE_URL}/${articleSlug}/versions/${versionId}`);

const restore = ({ versionId, articleSlug }) =>
  axios.put(
    `${ARTICLES_BASE_URL}/${articleSlug}/versions/${versionId}/restore`
  );

const versionsApi = { show, restore };

export default versionsApi;
