# frozen_string_literal: true

json.article do
  json.partial! "api/v1/articles/article", article: @article
  json.extract! @article, :updated_at

  json.category do
    json.extract! @article.category, :id, :name
  end

  json.versions @article.versions do |version|
    json.extract! version, :id, :event, :created_at
  end
end
