import axios from "axios";

const fetch = () => axios.get("/api/v1/categories");

const categoriesApi = { fetch };

export default categoriesApi;
