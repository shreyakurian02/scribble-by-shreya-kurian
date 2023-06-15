import { stringify, parse } from "qs";
import { without } from "ramda";

export const handleFilterByCategories = ({
  queryCategories,
  history,
  selectedCategory,
}) => {
  const selectedCategories = queryCategories?.includes(selectedCategory)
    ? without([selectedCategory], queryCategories)
    : [...queryCategories, selectedCategory];

  pushURLSearchParams({
    history,
    param: "categories",
    value: selectedCategories,
  });
};

export const pushURLSearchParams = ({ history, param, value }) => {
  const queryParams = getSearchParams();
  history.push({ search: stringify({ ...queryParams, [param]: value }) });
};

export const getSearchParams = () => {
  const {
    status = "all",
    categories = [],
    search = "",
  } = parse(location.search, { ignoreQueryPrefix: true });

  return { status, categories, search };
};
