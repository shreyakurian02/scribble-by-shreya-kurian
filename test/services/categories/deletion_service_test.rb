# frozen_string_literal: true

require "test_helper"

class Categories::DeletionServiceTest < ActiveSupport::TestCase
  def setup
    @site = create :site
    @category = create :category, site: @site
    current_user = create :user, site: @site
    @articles = create_list(:article, 5, category: @category, author: current_user)
  end

  def test_category_deletion_moves_associated_articles_to_requested_category
    move_to_category = create :category, site: @site
    assert_equal 0, move_to_category.articles.size

    assert_difference "Category.count", -1 do
      Categories::DeletionService.new(@site, @category, move_to_category.id).process!
    end

    assert_equal @articles.size, move_to_category.reload.articles.size
  end

  def test_creates_default_category_when_last_category_is_deleted_and_has_articles
    Categories::DeletionService.new(@site, @category).process!
    assert_equal 1, @site.categories.count
    assert_equal Category::DEFAULT_CATEGORY_NAME, Category.first.name
  end

  def test_default_category_is_not_created_when_last_category_with_no_articles_is_deleted
    @category.articles.destroy_all

    assert_difference "Category.count", -1 do
      Categories::DeletionService.new(@site, @category).process!
    end
    assert_equal 0, @site.categories.count
  end

  def test_cannot_delete_default_category_if_last
    Categories::DeletionService.new(@site, @category).process!
    default_category = Category.first

    error = assert_raises ArgumentError do
      Categories::DeletionService.new(@site, default_category).process!
    end

    assert_includes error.message, I18n.t("errors.default_category_deletion")
  end

  def test_can_delete_default_category_if_not_last
    Categories::DeletionService.new(@site, @category).process!
    new_category = create :category, site: @site
    default_category = Category.find_by!(name: Category::DEFAULT_CATEGORY_NAME)

    assert_difference "Category.count", -1 do
      Categories::DeletionService.new(@site, default_category, new_category.id).process!
    end
  end
end
