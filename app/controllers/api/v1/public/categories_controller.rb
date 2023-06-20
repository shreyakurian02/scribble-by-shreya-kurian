# frozen_string_literal: true

class Api::V1::Public::CategoriesController < Api::V1::Public::BaseController
  def index
    @categories = @site.categories.joins(:articles)
      .where(articles: { status: Article.statuses[:published] })
      .distinct.order(:position)
  end
end
