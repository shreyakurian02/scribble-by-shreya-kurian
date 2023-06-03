# frozen_string_literal: true

require "test_helper"

class Api::V1::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @article = create :article
  end

  def test_should_list_all_articles
    create_list(:article, 5)
    get(api_v1_articles_path, headers:)
    assert_response :success
    assert_equal 6, response_json["articles"].length
  end

  def test_should_create_valid_article
    category = create :category
    assert_difference "Article.count" do
      post(api_v1_articles_path, params: article_params({ category_id: category.id }), headers:)
      assert_response :success
    end
    assert_equal I18n.t("successfully_created", entity: "Article"), response_json["notice"]
  end

  def test_shouldnt_create_article_without_invalid_params
    assert_no_difference "Article.count" do
      post(api_v1_articles_path, params: article_params, headers:)
      assert_response :unprocessable_entity
    end
    assert_equal I18n.t("errors.must_exist", entity: "Category"), response_json["error"]
  end

  private

    def article_params(other_attributes = {})
      { article: { title: Faker::Lorem.word, description: Faker::Lorem.word }.merge!(other_attributes) }
    end
end
