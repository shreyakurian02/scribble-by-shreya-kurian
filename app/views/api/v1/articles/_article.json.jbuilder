# frozen_string_literal: true

json.extract! article, :id, :title, :description, :last_published_at, :status
json.author article.author.name
json.category do
  json.extract! article.category, :id, :name
end
