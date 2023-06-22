# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create :site
    @headers = public_headers(@site)
    @categories= create_list :category, 5, site: @site
  end

  def test_should_only_list_categories_with_published_articles
    create(:article, :published, category: @categories.first)
    categories_with_published_articles = @site.categories.joins(:articles).where(articles: { status: Article.statuses[:published] }).distinct
    get api_v1_public_categories_path, headers: @headers
    assert_response :success
    assert_equal categories_with_published_articles.length, response_json["categories"].length
  end

  def test_categories_is_not_accessable_to_unauthenticated_user
    get(api_v1_public_categories_path, headers:)
    assert_response :unauthorized
    assert_includes response_json["error"], I18n.t("session.could_not_auth")
  end
end
