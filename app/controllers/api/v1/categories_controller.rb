# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy reorder]

  def index
    @categories = Categories::FilterService.new(filter_params).process
  end

  def create
    category = Category.create!(category_params)
    render_notice(t("successfully_created", entity: "Category"), :ok, { category_id: category.id })
  end

  def update
    @category.update!(category_params)
    render_notice(t("successfully_updated", entity: "Category"))
  end

  def destroy
    Categories::DeletionService.new(@category, params[:move_to_category_id]).process
    render_notice(t("successfully_deleted", entity: "Category"))
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
