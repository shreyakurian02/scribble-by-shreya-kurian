# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create :site
    @redirection = create :redirection, site: @site
  end

  def test_should_get_successfully_from_root_url
    get root_path
    assert_response :success
  end

  def test_redirects_to_to_path_with_host_name
    get @redirection.from_path
    assert_redirected_to @redirection.to_path, status: :moved_permanently
  end

  def test_redirects_to_to_path_without_host_name
    @redirection.update!(to_path: "/about")
    get @redirection.reload.from_path
    assert_redirected_to "#{request.base_url}#{@redirection.to_path}", status: :moved_permanently
  end
end
