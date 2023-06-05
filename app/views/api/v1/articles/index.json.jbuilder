# frozen_string_literal: true

json.articles @articles do |article|
  json.category article.category.name
  json.partial! "api/v1/articles/article", article:
end

json.articles_count do
  json.filtered @filtered_count
  json.all Article.count
  json.draft Article.draft.size
  json.published Article.published.size
end
