# frozen_string_literal: true

require "test_helper"

class Articles::FilterServiceTest < ActiveSupport::TestCase
  def setup
    @articles = create_list(:article, 5)
  end

  def test_filter_by_status
    @articles[0].update!(status: "published")
    process_service({ status: "published" })
    assert_equal [@articles[0].id], @filtered_articles.pluck("id")
    assert_equal 1, @filtered_count
  end

  def test_filter_by_category
    selected_categories = [@articles[0].category.name]
    expected_articles_with_selected_categories = @articles.select { |article|
      selected_categories.include? article.category.name }
    process_service({ categories: selected_categories })
    assert_equal expected_articles_with_selected_categories.pluck("id"), @filtered_articles.pluck("id")
  end

  def test_filter_by_search_term
    search_term = @articles[0].title
    expected_articles_with_search_term = Article.where("title ILIKE ?", "%#{search_term}%")
    process_service({ search: search_term })
    assert_equal expected_articles_with_search_term.pluck("id"), @filtered_articles.pluck("id")
    assert_equal expected_articles_with_search_term.count, @filtered_count
  end

  def test_pagination
    process_service({ per_page: 2, page_number: 3 })
    assert_equal 1, @filtered_articles.count
  end

  private

    def process_service(options)
      @filtered_articles, @filtered_count = Articles::FilterService.new(options).process.values_at(
        :articles,
        :filtered_count)
    end
end
