# frozen_string_literal: true

require "test_helper"

class Api::V1::Bulk::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    site = create :site
    category = create(:category, site:)
    current_user = create(:user, site:)
    @articles = create_list(:article, 5, author: current_user, category:)
  end

  def test_bulk_articles_update_success
    article_with_draft_status = @articles.first
    put(api_v1_bulk_articles_path, params: article_params({ article: { status: "published" } }), headers:)
    assert_response :success
    assert_equal I18n.t("successfully_updated", entity: "Articles"), response_json["notice"]
    assert_equal "published", article_with_draft_status.reload.status
  end

  def test_bulk_articles_update_failure
    invalid_status = "pub"
    put(api_v1_bulk_articles_path, params: article_params({ article: { status: invalid_status } }), headers:)
    assert_response :unprocessable_entity
    assert_includes response_json["error"], I18n.t("article.invalid_status", status: invalid_status)
  end

  def test_bulk_destroy_articles
    assert_difference "Article.count", -5 do
      delete(api_v1_bulk_articles_path, params: article_params, headers:)
      assert_response :success
    end

    assert_equal I18n.t("successfully_deleted", entity: "Articles"), response_json["notice"]
  end

  private

    def article_params(other_attributes = {})
      { ids: [@articles.pluck(:id)] }.merge!(other_attributes)
    end
end
