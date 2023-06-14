# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
  end

  def test_should_login_into_site_with_valid_credentials
    post(api_v1_public_session_path, params: { login: { password: @site.password } }, headers:)
    assert_response :success
    assert_equal @site.authentication_token, response_json["authentication_token"]
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post(api_v1_public_session_path, params: { login: { password: "Invalid password" } }, headers:)
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal I18n.t("session.incorrect_credentials"), response_json["error"]
  end
end
