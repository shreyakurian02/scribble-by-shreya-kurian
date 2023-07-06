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

  pushUrlSearchParams({
    history,
    param: "categories",
    value: selectedCategories,
  });
};

export const pushUrlSearchParams = ({ history, param, value }) => {
  const queryParams = getQueryParams();
  history.push({ search: stringify({ ...queryParams, [param]: value }) });
};

export const getQueryParams = () => {
  const {
    status = "all",
    categories = [],
    search = "",
  } = parse(location.search, { ignoreQueryPrefix: true });

  return { status, categories, search };
};
