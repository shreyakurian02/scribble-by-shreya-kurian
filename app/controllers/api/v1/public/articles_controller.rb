# frozen_string_literal: true

class Api::V1::Public::ArticlesController < Api::V1::Public::BaseController
  include PublicArticlesQueryHelper

  before_action :load_article!, only: :show

  def index
    @articles = filter_by_search_in_title_and_description(published_articles, params[:search])
  end

  def show
    render
  end

  private

  def load_article!
    @article = published_articles.find_by!(slug: params[:slug])
  end

  def published_articles
    @site.articles.published
  end
end
