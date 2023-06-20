# frozen_string_literal: true

class Api::V1::Public::CategoriesController < Api::V1::Public::BaseController
  before_action :load_categories_with_published_articles, before_action: :index

  def index
    render
  end

  private

  def load_categories_with_published_articles
    @categories = @site.categories.joins(:articles).where(articles: { status: Article.statuses[:published] }).distinct.order(:position)
  end
end
