# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = create(:category)
  end

  def test_category_should_not_be_valid_without_name
    @category.name = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_should_not_be_valid_with_invalid_length
    @category.name = "0" * (Category::MAXIMUM_NAME_LENGTH + 1)
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name is too long (maximum is #{Category::MAXIMUM_NAME_LENGTH} characters)"
  end

  def test_category_should_not_be_vald_with_duplicate_name_within_same_site
    new_category = build :category, name: @category.name, site: @category.site
    assert_not new_category.valid?
    assert_includes new_category.errors.full_messages, "Name has already been taken"
  end

  def test_category_is_valid_with_duplicate_name_in_different_sites
    new_category = build :category, name: @category.name
    assert new_category.valid?
  end

  def test_category_should_not_be_saved_with_invalid_name_format
    @category.name = "*"
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name should have atleast one alphanumeric character"
  end

  def test_category_shouldnt_be_saved_without_site
    @category.site_id = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Site must exist"
  end
end
