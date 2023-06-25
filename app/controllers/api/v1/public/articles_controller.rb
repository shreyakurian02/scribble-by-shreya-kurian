# frozen_string_literal: true

class Api::V1::Public::ArticlesController < Api::V1::Public::BaseController
  before_action :load_article!, only: :show

  def index
    @articles = published_articles.where("title ILIKE ?", "%#{params[:search]}%")
      .or(published_articles.where("description ILIKE ?", "%#{params[:search]}%"))
  end

  def show
    render
  end

  private

  def load_article!
    @article = published_articles.find_by!(slug: params[:slug])
  end

  def published_articles
    @_published_articles = @site.articles.published
  end
end
