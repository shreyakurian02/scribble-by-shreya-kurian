# frozen_string_literal: true

require "test_helper"

class Api::V1::SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create :site
  end

  def test_should_update_category
    new_title = "Updated title"
    put(api_v1_site_path, params: { site: { title: new_title } }, headers:)
    assert_response :success
    assert_equal I18n.t("successfully_updated", entity: "Site"), response_json["notice"]
    assert_equal new_title, @site.reload.title
  end

  def test_shouldnt_update_site_with_invalid_title
    assert_no_difference "Site.count" do
      put(api_v1_site_path, params: { site: { title: "" } }, headers:)
      assert_response :unprocessable_entity
    end

    assert_includes response_json["error"], I18n.t("errors.presence", entity: "Title"), response_json["error"]
  end

  def test_should_show_site
    get(api_v1_site_path, headers:)
    assert_response :success
    assert_equal ["title"], response_json["site"].keys.sort
  end
end
