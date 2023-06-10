export const getCategoryOptions = categories =>
  categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));
