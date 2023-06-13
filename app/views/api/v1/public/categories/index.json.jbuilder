json.categories @categories do |category|
  json.extract! category, :id, :name
  json.articles category.articles.published do |article|
    json.extract! article, :title, :slug
  end
end
