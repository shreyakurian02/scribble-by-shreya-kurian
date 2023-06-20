# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create :site
    @headers = public_headers(@site)
    create_list :category, 5, site: @site
  end

  def test_should_list_all_categories
    get(api_v1_public_categories_path, headers: @headers)
    assert_response :success
    assert_equal @site.categories.length, response_json["categories"].length
  end
end
