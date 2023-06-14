# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @article = create :article, status: "published"
  end

  def test_should_show_article
    get(api_v1_public_article_path(@article.slug), headers:)
    assert_response :success
    assert_equal %w[category_id description title], response_json["article"].keys.sort
  end

  def test_shouldnt_show_article_with_draft_status
    draft_article = create :article
    get(api_v1_public_article_path(draft_article.slug), headers:)
    assert_response :not_found
    assert_includes response_json["error"], "Article not found"
  end
end
