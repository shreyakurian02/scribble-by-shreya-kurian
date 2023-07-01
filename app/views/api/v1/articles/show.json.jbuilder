# frozen_string_literal: true

json.article do
  json.partial! "api/v1/articles/article", article: @article
  json.extract! @article, :updated_at

  if (publish_schedule = @article.publish_schedule.presence)
    json.publish_schedule do
      json.extract! publish_schedule, :id, :datetime
    end
  end

  if (unpublish_schedule = @article.unpublish_schedule.presence)
    json.unpublish_schedule do
      json.extract! unpublish_schedule, :id, :datetime
    end
  end

  json.category do
    json.extract! @article.category, :id, :name
  end

  json.versions @article.versions do |version|
    json.extract! version, :id, :event, :created_at
  end
end
