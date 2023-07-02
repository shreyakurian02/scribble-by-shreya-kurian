# frozen_string_literal: true

require "test_helper"

class Articles::ScheduleServiceTest < ActiveSupport::TestCase
  def setup
    @article = create :article
    @datetime = convert_to_ist(DateTime.current + 1.hour)
  end

  def test_article_is_unpublished_at_scheduled_time
    assert_equal "published", @article.status
    create :article_schedule, :unpublish, datetime: @datetime, article: @article

    assert_changes "@article.reload.status", from: "published", to: "draft" do
      travel_to(@datetime)
      Articles::ScheduleService.new.process!
    end
  end

  def test_article_is_published_at_scheduled_time
    @article.draft!
    assert_equal "draft", @article.status
    create :article_schedule, :publish, datetime: @datetime, article: @article

    assert_changes "@article.reload.status", from: "draft", to: "published" do
      travel_to(@datetime)
      Articles::ScheduleService.new.process!
    end
  end

  def test_schedule_is_destroyed_once_executed
    create :article_schedule, :unpublish, datetime: @datetime, article: @article
    assert_difference "@article.article_schedules.size", -1 do
      travel_to(@datetime)
      Articles::ScheduleService.new.process!
    end
  end
end
