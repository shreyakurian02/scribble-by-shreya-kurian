# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_not_be_valid_without_name
    @category.name = ""
    assert @category.invalid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_should_not_be_valid_with_invalid_length
    @category.name = "0" * (Category::MAXIMUM_NAME_LENGTH + 1)
    assert @category.invalid?
    assert_includes @category.errors.full_messages, "Name is too long (maximum is #{Category::MAXIMUM_NAME_LENGTH} characters)"
  end

  def test_category_should_not_be_vald_with_duplicate_name
    @category.save!
    new_category = build :category, name: @category.name
    assert new_category.invalid?
    assert_includes new_category.errors.full_messages, "Name has already been taken"
  end

  def test_category_count_increases_on_saving
    assert_difference "Category.count" do
      create :category
    end
  end

  def test_category_should_not_be_saved_with_invalid_name_format
    @category.name = "*"
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name should have atleast one alphanumeric character"
  end
end
