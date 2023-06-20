# frozen_string_literal: true

class Api::V1::Public::ArticlesController < Api::V1::Public::BaseController
  before_action :load_article!, only: :show

  def show
    render
  end

  private

  def load_article!
    @article = @site.articles.published.find_by!(slug: params[:slug])
  end
end
