# frozen_string_literal: true

class Api::V1::ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def create
    @current_user.articles.create!(article_params)
    render_notice(t("successfully_created", entity: "Article"))
  end

  private

    def article_params
      params.require(:article).permit(:title, :description, :status, :category_id)
    end
end
