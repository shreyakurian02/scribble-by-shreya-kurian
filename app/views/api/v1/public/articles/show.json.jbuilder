json.article do
  json.extract! @article, :title, :description, :category_id
end

