# frozen_string_literal: true

class Api::V1::Public::CategoriesController < Api::V1::Public::BaseController
  def index
    @categories = Category.includes(:articles).order(:position)
  end
end
