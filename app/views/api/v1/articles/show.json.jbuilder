# frozen_string_literal: true

json.category do
  json.partial! "api/v1/articles/article", article: @article
end
