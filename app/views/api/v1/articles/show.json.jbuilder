# frozen_string_literal: true

json.article do
  json.partial! "api/v1/articles/article", article: @article
  json.category do
    json.extract! @article.category, :id, :name
  end
end
