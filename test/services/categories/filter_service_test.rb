# frozen_string_literal: true

require "test_helper"

class Categories::FilterServiceTest < ActiveSupport::TestCase
  def setup
    @categories = create_list(:category, 5)
  end

  def test_filter_by_search_term
    search_term = @categories[0].name
    expected_categories_with_search_term = Category.where("name ILIKE ?", "%#{search_term}%")
    @filtered_categories = Categories::FilterService.new({ search: search_term }).process
    assert_equal expected_categories_with_search_term.pluck("id"), @filtered_categories.pluck("id")
    assert_equal 1, @filtered_categories.count
  end
end
