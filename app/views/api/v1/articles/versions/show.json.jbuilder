# frozen_string_literal: true

json.version do
  json.extract! @version, :title, :description
  json.version_category @version.category&.name
  json.article_category @article.category.name
end
