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
    assert_equal I18n.t("errors.presence", entity: "Name"), response_json["error"]
  end

  private

    def category_params
      { category: { name: "Userflow" } }
    end
end
