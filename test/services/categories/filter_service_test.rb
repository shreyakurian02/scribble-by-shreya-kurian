# frozen_string_literal: true

require "test_helper"

class Categories::FilterServiceTest < ActiveSupport::TestCase
  def setup
    @site = create :site
    @categories = create_list :category, 5, site: @site
  end

  def test_filter_by_search_term
    search_term = @categories[0].name
    possible_search_terms = [search_term.upcase, search_term.downcase]

    possible_search_terms.each do |search|
      expected_categories_with_search_term = Category.where("name ILIKE ?", "%#{search}%")
      @filtered_categories = Categories::FilterService.new(@site, { search: }).process
      assert_equal expected_categories_with_search_term.ids.sort, @filtered_categories.ids.sort
      assert_equal expected_categories_with_search_term.size, @filtered_categories.size
    end
  end
end
