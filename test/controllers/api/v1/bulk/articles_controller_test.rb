# frozen_string_literal: true

require "test_helper"

class Api::V1::Bulk::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @articles = create_list(:article, 5, status: "draft")
  end

  def test_should_bulk_update_articles_status
    article_with_draft_status = @articles.first
    put(api_v1_bulk_articles_path, params: article_params({ article: { status: "published" } }), headers:)
    assert_response :success
    assert_equal I18n.t("successfully_updated", entity: "Articles"), response_json["notice"]
    assert_equal "published", article_with_draft_status.reload.status
  end

  def test_shouldnt_update_articles_with_invalid_status
    invalid_status = "pub"
    put(api_v1_bulk_articles_path, params: article_params({ article: { status: invalid_status } }), headers:)
    assert_response :unprocessable_entity
    assert_equal I18n.t("article.invalid_status", status: invalid_status), "'pub' is not a valid status"
  end

  def test_bulk_destroy_articles
    assert_difference "Article.count", -5 do
      delete(api_v1_bulk_articles_path, params: article_params, headers:)
      assert_response :ok
    end
    assert_equal I18n.t("successfully_deleted", entity: "Articles"), response_json["notice"]
  end

  private

    def article_params(other_attributes = {})
      { ids: [@articles.pluck(:id)] }.merge!(other_attributes)
    end
end
