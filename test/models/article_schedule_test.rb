# frozen_string_literal: true

require "test_helper"

class ArticleScheduleTest < ActiveSupport::TestCase
  def setup
    @article_schedule = create :article_schedule
    @article = @article_schedule.article
  end

  def test_article_schedule_should_not_be_valid_without_datetime
    @article_schedule.datetime = ""
    assert_not @article_schedule.valid?
    assert_includes @article_schedule.errors.full_messages, "Datetime can't be blank"
  end

  def test_article_can_have_only_one_publish_and_one_unpublish_schedule
    error = assert_raises ActiveRecord::RecordInvalid do
      create(:article_schedule, :unpublish, article: @article.reload)
    end
    assert_includes error.message, I18n.t("errors.schedule_exists")

    publish_schedule = create(
      :article_schedule, :publish, article: @article,
      datetime: @article_schedule.datetime + 1.day)
    error = assert_raises ActiveRecord::RecordInvalid do
      create(:article_schedule, :publish, article: @article.reload, datetime: @article_schedule.datetime + 1.day)
    end
    assert_includes error.message, I18n.t("errors.schedule_exists")
  end

  def test_schedule_shouldnt_be_saved_with_past_datetime
    schedule = build :article_schedule, :unpublish, article: @article, datetime: DateTime.yesterday
    assert_not schedule.valid?
    assert_includes schedule.errors.full_messages, "Datetime #{I18n.t("errors.future_date")}"
  end

  def test_shouldnt_save_unpublish_schedule_for_draft_article_unless_publish_later_schedule_is_present
    draft_article = create(:article, :draft)
    unpublish_schedule = build :article_schedule, :unpublish, article: draft_article
    assert_not unpublish_schedule.valid?
    assert_includes unpublish_schedule.errors.full_messages,
      I18n.t("errors.invalid_schedule", kind: ArticleSchedule.kinds["publish"], status: draft_article.status)
  end

  def test_shouldnt_save_unpublish_schedule_for_draft_article_with_datetime_less_than_publish_schedules_datetime
    draft_article = create(:article, :draft)
    publish_schedule = create :article_schedule, :publish, article: draft_article
    assert publish_schedule.valid?

    unpublish_schedule = build :article_schedule, :unpublish, article: draft_article.reload,
      datetime: publish_schedule.reload.datetime - 1.minute
    assert_not unpublish_schedule.valid?
    assert_includes unpublish_schedule.errors.full_messages,
      "Datetime #{I18n.t("errors.invalid_schedule_datetime", kind: ArticleSchedule.kinds["publish"])}"
  end

  def test_shouldnt_save_publish_schedule_for_published_article_unless_unpublish_later_schedule_is_present
    published_article = create :article
    publish_schedule = build :article_schedule, :publish, article: published_article
    assert_not publish_schedule.valid?
    assert_includes publish_schedule.errors.full_messages,
      I18n.t("errors.invalid_schedule", kind: ArticleSchedule.kinds["unpublish"], status: published_article.status)
  end

  def test_shouldnt_save_publish_schedule_for_published_article_with_datetime_less_than_unpublish_schedules_datetime
    published_article = create :article
    unpublish_schedule = create :article_schedule, :unpublish, article: published_article
    assert unpublish_schedule.valid?

    publish_schedule = build :article_schedule, :publish, article: published_article.reload,
      datetime: unpublish_schedule.reload.datetime - 1.minute
    assert_not publish_schedule.valid?
    assert_includes publish_schedule.errors.full_messages,
      "Datetime #{I18n.t("errors.invalid_schedule_datetime", kind: ArticleSchedule.kinds["unpublish"])}"
  end
end
