import axios from "axios";

import { PUBLIC_CATEGORIES_BASE_URL } from "constants";

const fetch = () => axios.get(PUBLIC_CATEGORIES_BASE_URL);

const categoriesApi = { fetch };

export default categoriesApi;
