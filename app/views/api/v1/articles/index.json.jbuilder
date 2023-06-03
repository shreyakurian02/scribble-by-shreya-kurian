# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :id, :title, :description, :last_published_at, :status
  json.author article.author.first_name
  json.category article.category.name
end
