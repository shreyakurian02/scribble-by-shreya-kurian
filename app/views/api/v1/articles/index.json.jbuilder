# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :id, :title, :description, :last_published_at, :status
  json.author article.author.name
  json.category article.category.name
end

json.articles_count do
  json.all @articles.size
  json.draft @articles.draft.size
  json.published @articles.published.size
end
