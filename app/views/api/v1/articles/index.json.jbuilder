# frozen_string_literal: true

json.articles @articles do |article|
  json.category article.category.name
  json.partial! "api/v1/articles/article", article:
end

json.articles_count do
  json.all @articles.size
  json.draft @articles.draft.size
  json.published @articles.published.size
end

