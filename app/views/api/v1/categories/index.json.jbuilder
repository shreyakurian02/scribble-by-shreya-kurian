# frozen_string_literal: true

json.categories @categories do |category|
  json.extract! category, :id, :name
  json.articles_count category.articles_count || 0
end
