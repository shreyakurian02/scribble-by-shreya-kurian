# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    site = create :site
    @category = create(:category, site:)
    @current_user = create(:user, site:)
    @article = create(:article, :published, category: @category, user: @current_user)
    @headers = public_headers(site)
  end

  def test_article_is_not_accessible_to_unauthenticated_user
    get(api_v1_public_article_path(@article.slug), headers:)
    assert_response :unauthorized
    assert_includes response_json["error"], I18n.t("session.could_not_auth")
  end

  def test_should_show_published_article
    get api_v1_public_article_path(@article.slug), headers: @headers
    assert_response :success
    assert_equal %w[category_id description title], response_json["article"].keys.sort
  end

  def test_shouldnt_show_draft_article
    draft_article = create :article, category: @category, user: @current_user
    get api_v1_public_article_path(draft_article.slug), headers: @headers
    assert_response :not_found
    assert_includes response_json["error"], "Article not found"
  end
end
