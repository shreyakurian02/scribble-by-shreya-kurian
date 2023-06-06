export const buildInitialValues = ({
  title,
  description,
  category: { name: cartegoryName, id: cartegoryId },
}) => ({
  title,
  description,
  category: { label: cartegoryName, value: cartegoryId },
});
