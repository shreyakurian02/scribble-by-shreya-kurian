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

  def test_should_update_valid_article
    new_title = "Updated title"
    put(api_v1_article_path(@article.slug), params: { article: { title: new_title } }, headers:)
    assert_response :success
    assert_equal I18n.t("successfully_updated", entity: "Article"), response_json["notice"]
    assert_equal new_title, @article.reload.title
  end

  def test_shouldnt_update_article_with_invalid_params
    new_title = "Updated title"
    put(api_v1_article_path(@article.slug), params: { article: { title: "" } }, headers:)
    assert_response :unprocessable_entity
    assert_equal I18n.t("errors.presence", entity: "Title"), response_json["error"]
    assert_not_equal new_title, @article.reload.title
  end

  def test_destroy_article
    assert_difference "Article.count", -1 do
      delete(api_v1_article_path(@article.slug), headers:)
      assert_response :ok
    end
    assert_equal I18n.t("successfully_deleted", entity: "Article"), response_json["notice"]
  end

  def test_destroy_article
    assert_difference "Article.count", -1 do
      delete(api_v1_article_path(@article.slug), headers:)
      assert_response :ok
    end
    assert_equal I18n.t("successfully_deleted", entity: "Article"), response_json["notice"]
  end

  def test_shouldnt_destroy_article_with_invalid_slug
    assert_no_difference "Article.count" do
      delete(api_v1_article_path("invalid-slug"), headers:)
      assert_response :not_found
    end
  end

  def test_should_show_article
    get(api_v1_article_path(@article.slug), headers:)
    assert_response :success
  end

  def test_shouldnt_create_article_with_invalid_params
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
