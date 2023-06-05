# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  def index
    @categories = Categories::FilterService.new(filter_params).process
  end

  def create
    Category.create!(category_params)
    render_notice(t("successfully_created", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def filter_params
      params.permit(:search)
    end
end
