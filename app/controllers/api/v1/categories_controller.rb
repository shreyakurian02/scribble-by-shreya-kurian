# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  before_action :load_category!, only: :reorder

  def index
    @categories = Categories::FilterService.new(filter_params).process.order(:position)
  end

  def create
    category = Category.create!(category_params)
    render_notice(t("successfully_created", entity: "Category"), :ok, { category_id: category.id })
  end

  def reorder
    @category.insert_at(category_params[:position].to_i + 1)
  end

  private

    def category_params
      params.require(:category).permit(:name, :position)
    end

    def filter_params
      params.permit(:search)
    end

    def load_category!
      @category = Category.find(params[:id])
    end
end
