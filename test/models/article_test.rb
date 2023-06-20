# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @article = create(:article)
  end

  def test_article_should_not_be_saved_without_title
    @article.title = ""
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_article_count_increases_on_saving
    assert_difference "Article.count" do
      create :article
    end
  end

  def test_article_should_not_be_saved_without_description
    @article.description = ""
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Description can't be blank"
  end

  def test_slug_is_immutable
    assert_raises ActiveRecord::RecordInvalid do
      @article.update!(slug: "modified-slug")
    end

    assert_includes @article.errors.full_messages, "Slug #{I18n.t("slug.immutable")}"
  end

  def test_article_should_not_be_valid_with_duplicate_slug
    new_article = build :article, slug: @article.slug
    assert_not new_article.valid?
    assert_includes new_article.errors.full_messages, "Slug has already been taken"
  end

  def test_slug_is_parameterized_title
    parameterized_title = @article.title.parameterize
    assert_equal parameterized_title, @article.slug
  end

  def test_slug_is_unique_for_articles_with_duplicate_title
    article_two = create :article, title: @article.title
    assert_not_equal @article.slug, article_two.slug
  end

  def test_article_has_author
    @article.author_id = nil
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Author must exist"
  end

  def test_article_has_category
    @article.category_id = nil
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Category must exist"
  end

  def test_article_should_not_be_valid_with_invalid_title_length
    @article.title = "a" * (Article::MAXIMUM_TITLE_LENGTH + 1)
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Title is too long (maximum is #{Article::MAXIMUM_TITLE_LENGTH} characters)"
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_titles
    title = "test article"
    article_one = create(:article, title:)
    article_two = create(:article, title:)

    assert_equal title.parameterize, article_one.slug
    assert_equal "#{title.parameterize}-2", article_two.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_hyphenated_titles
    title = "test-article"
    article_one = create(:article, title:)
    article_two = create(:article, title:)

    assert_equal title.parameterize, article_one.slug
    assert_equal "#{title.parameterize}-2", article_two.slug
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-article"
    articles = create_list(:article, 4, title:)

    third_task, fourth_task = articles[2], articles[3]
    assert_equal fourth_task.slug, "#{title.parameterize}-4"

    third_task.destroy
    expected_slug_suffix_for_new_task = fourth_task.slug.split("-").last.to_i + 1

    new_task = create(:article, title:)
    assert_equal "test-article-5", new_task.slug
  end

  def test_existing_slug_prefixed_in_new_article_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = "test article exists"
    new_title = "test article"

    existing_article = create :article, title: title_having_new_title_as_substring
    assert_equal title_having_new_title_as_substring.parameterize, existing_article.slug

    new_article = create :article, title: new_title
    assert_equal new_title.parameterize, new_article.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "test 1 article"

    existing_article = create :article, title: title_with_numbered_substring
    assert_equal title_with_numbered_substring.parameterize, existing_article.slug

    substring_of_existing_slug = "test-1"
    new_article = create :article, title: substring_of_existing_slug

    assert_equal substring_of_existing_slug.parameterize, new_article.slug
  end

  def test_updating_title_does_not_update_slug
    assert_no_changes "@article.slug" do
      @article.update!(title: Faker::Lorem.word)
    end
  end

  def test_article_should_not_be_saved_with_invalid_title_format
    @article.title = "*"
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title should have atleast one alphanumeric character"
  end

  def test_last_published_at_updates_when_status_is_published
    article = create(:article, status: "draft")
    assert_nil article.last_published_at
    article.published!
    assert_not_nil article.last_published_at
  end

  def test_last_published_at_does_not_updates_when_status_was_already_published
    article = create(:article, status: "published")
    last_published_at = article.last_published_at
    article.published!
    assert_equal last_published_at, article.reload.last_published_at
  end
end
