# frozen_string_literal: true

class Api::V1::Public::CategoriesController < ApplicationController
  def index
    @categories = Category.all.includes(:articles).order(:position)
  end
end
