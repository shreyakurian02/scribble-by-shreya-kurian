# frozen_string_literal: true

require "test_helper"

class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create :category
  end

  def test_should_list_all_categories
    create_list(:category, 5)
    get(api_v1_categories_path, headers:)
    assert_response :success
    assert_equal 6, response_json["categories"].length
  end

  def test_should_create_valid_category
    assert_difference "Category.count" do
      post(
        api_v1_categories_path, params: category_params, headers:)
      assert_response :success
    end

    assert_equal I18n.t("successfully_created", entity: "Category"), response_json["notice"]
  end

  def test_shouldnt_create_category_without_name
    assert_no_difference "Category.count" do
      post(api_v1_categories_path, params: { category: { name: "" } }, headers:)
      assert_response :unprocessable_entity
    end

    assert_includes response_json["error"], I18n.t("errors.presence", entity: "Name"), response_json["error"]
  end

  def test_should_update_valid_category
    new_name = "Bugs"
    put(api_v1_category_path(@category.id), params: { category: { name: new_name } }, headers:)
    assert_response :success
    assert_equal I18n.t("successfully_updated", entity: "Category"), response_json["notice"]
    assert_equal new_name, @category.reload.name
  end

  def test_shouldnt_update_category_with_invalid_params
    existing_title = @category.name
    put(api_v1_category_path(@category.id), params: { category: { name: "" } }, headers:)
    assert_response :unprocessable_entity
    assert_includes response_json["error"], I18n.t("errors.presence", entity: "Name")
    assert_equal existing_title, @category.reload.name
  end

  def test_destroy_category
    delete(api_v1_category_path(@category.id), headers:)
    assert_response :ok
    assert_equal I18n.t("successfully_deleted", entity: "Category"), response_json["notice"]
  end

  def test_creates_default_category_when_last_category_is_deleted
    assert_no_difference "Category.count" do
      delete(api_v1_category_path(@category.id), headers:)
      assert_response :ok
    end
    assert_equal Category::DEFAULT_CATEGORY_NAME, Category.first.name
    assert_equal I18n.t("successfully_deleted", entity: "Category"), response_json["notice"]
  end

  def test_shouldnt_destroy_category_with_invalid_id
    assert_no_difference "Category.count" do
      delete(api_v1_category_path("invalid-id"), headers:)
      assert_response :not_found
    end
    assert_includes response_json["error"], "Category not found"
  end

  def test_reorder_categories
    new_category = create :category
    assert_equal 1, @category.position
    put(api_v1_category_path(@category.id), params: { category: { position: new_category.position } }, headers:)
    assert_equal 2, @category.reload.position
  end

  private

    def category_params
      { category: { name: "Userflow" } }
    end
end
