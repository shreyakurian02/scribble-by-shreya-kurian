# frozen_string_literal: true

require "test_helper"

class Api::V1::Articles::VersionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    site = create :site
    user = create(:user, site:)
    category = create(:category, site:)
    @article = create(:article, user:, category:)
  end

  def test_can_show_article_version_for_valid_params
    @article.update!(title: Faker::Name.first_name)
    get(api_v1_article_version_path(@article.slug, @article.versions.first.id), headers:)
    assert_response :success
    assert_equal %w[category description title], response_json["version"].keys.sort
  end

  def test_can_restore_article_to_old_version
    title_before_updating = @article.title
    @article.update!(title: Faker::Name.first_name)
    put(restore_api_v1_article_version_path(@article.slug, @article.versions.first.id), headers:)
    assert_response :success
    assert_equal I18n.t("successfully_restored", entity: "Article"), response_json["notice"]
    assert_equal title_before_updating, @article.reload.title
  end

  def test_cannot_show_article_version_for_invalid_params
    @article.update!(title: Faker::Name.first_name)
    get(api_v1_article_version_path("invalid-article-slug", "invalid-version-id"), headers:)
    assert_response :not_found
  end
end
