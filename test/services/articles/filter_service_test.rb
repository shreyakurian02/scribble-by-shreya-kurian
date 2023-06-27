# frozen_string_literal: true

require "test_helper"

class Articles::FilterServiceTest < ActiveSupport::TestCase
  def setup
    site = create :site
    @category = create(:category, site:)
    @current_user = create(:user, site:)
    @articles = create_list(:article, 5, category: @category, user: @current_user)
  end

  def test_filter_by_status
    selected_status = "published"
    @articles.first.published!
    process_service({ status: selected_status })
    expected_articles_with_selected_status = @current_user.articles.send(selected_status)
    assert_equal expected_articles_with_selected_status.ids.sort, @filtered_articles.ids.sort
    assert_equal expected_articles_with_selected_status.size, @filtered_count
  end

  def test_filter_by_category
    selected_categories = [@articles.first.category.name]
    expected_articles_with_selected_categories = @current_user.articles.includes(:category)
      .where(category: { name: selected_categories })
    process_service({ categories: selected_categories })
    assert_equal expected_articles_with_selected_categories.ids.sort, @filtered_articles.ids.sort
  end

  def test_filter_by_search_term
    search_term = @articles.first.title
    possible_search_terms = [search_term.upcase, search_term.downcase]

    possible_search_terms.each do |search|
      expected_articles_with_search_term = @current_user.articles.where("title ILIKE ?", "%#{search}%")
      process_service({ search: })
      assert_equal expected_articles_with_search_term.ids.sort, @filtered_articles.ids.sort
      assert_equal expected_articles_with_search_term.size, @filtered_count
    end
  end

  def test_pagination
    expected_paginated_articles = @current_user.articles.order(updated_at: :desc).page(3).per(2)
    process_service({ per_page: 2, page_number: 3 })
    assert_equal expected_paginated_articles.size, @filtered_articles.size
    assert_equal expected_paginated_articles.ids.sort, @filtered_articles.ids.sort
  end

  def test_articles_are_ordered_by_updated_at_if_order_not_specified
    ordered_articles = @current_user.articles.order(updated_at: :desc)
    process_service
    assert_equal ordered_articles.ids, @filtered_articles.ids
  end

  def test_articles_are_ordered_by_specified_column_if_present
    ordered_articles = @current_user.articles.order(views: :desc)
    process_service({ order_by: "views", sort_order: "desc" })
    assert_equal ordered_articles.ids, @filtered_articles.ids
  end

  private

    def process_service(options = {})
      @filtered_articles, @filtered_count = Articles::FilterService.new(@category.site, options).process.values_at(
        :articles,
        :filtered_count)
    end
end
