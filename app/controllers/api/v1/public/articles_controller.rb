# frozen_string_literal: true

class Api::V1::Public::ArticlesController < ApplicationController
  before_action :load_article!, only: :show

  def show
    render
  end

  private

  def load_article!
    @article = Article.published.find_by!(slug: params[:slug])
  end
end
