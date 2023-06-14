# frozen_string_literal: true

require "test_helper"

class Categories::DeletionServiceTest < ActiveSupport::TestCase
  def setup
    @category = create :category
    @articles = create_list(:article, 5, category: @category)
  end

  def test_category_deletion_moves_associated_articles_to_requested_category
    move_to_category = create :category
    assert_equal 0, move_to_category.articles.count

    assert_difference "Category.count", -1 do
      Categories::DeletionService.new(@category, move_to_category.id).process
    end

    assert_equal @articles.count, move_to_category.articles.count
  end

  def test_creates_default_category_when_last_category_is_deleted
    Categories::DeletionService.new(@category, nil).process
    assert_equal 1, Category.count
    assert_equal Category::DEFAULT_CATEGORY_NAME, Category.first.name
  end

  def test_cannot_delete_default_category
    Categories::DeletionService.new(@category, nil).process
    default_category = Category.first

    error = assert_raises ArgumentError do
      Categories::DeletionService.new(default_category, nil).process
    end

    assert_includes error.message, I18n.t("errors.default_category_deletion")
  end
end
