# frozen_string_literal: true

class Api::V1::Bulk::ArticlesController < ApplicationController
  before_action :load_articles, only: %i[destroy update]

  def update
    Article.transaction do
      @articles.find_each { |article| article.update!(update_params) }
    end
    render_notice(t("successfully_updated", entity: "Articles"))
  end

  def destroy
    Article.transaction do
      @articles.destroy_all
    end
    render_notice(t("successfully_deleted", entity: "Articles"))
  end

  private

    def article_params
      params.require(:article).permit(:status, :category_id, ids: [])
    end

    def load_articles
      @articles = Article.where(id: article_params[:ids])
    end

    def update_params
      article_params.except(:ids)
    end
end
