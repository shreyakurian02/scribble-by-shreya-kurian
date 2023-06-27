# frozen_string_literal: true

class Api::V1::Public::ArticlesController < Api::V1::Public::BaseController
  before_action :load_article!, only: :show
  before_action :increment_article_views, only: :show

  def index
    @articles = published_articles.search_by_term_in_title_and_description(params[:search])
  end

  def show
    render
  end

  private

  def load_article!
    @article = published_articles.find_by!(slug: params[:slug])
  end

  def increment_article_views
    @article.increment!(:views)
  end

  def published_articles
    @site.articles.published
  end
end
