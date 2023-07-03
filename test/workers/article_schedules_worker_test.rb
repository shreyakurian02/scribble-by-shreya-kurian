# frozen_string_literal: true

require "test_helper"

class ArticleSchedulesWorkerTest < ActiveSupport::TestCase
  def setup
    Sidekiq::Testing.inline!
    datetime = convert_to_ist(DateTime.current + 1.hour)
    article_schedule = create(:article_schedule, datetime:)
    @article = article_schedule.article
    travel_to(datetime)
  end

  def test_will_execute_article_schedules
    assert_difference "@article.article_schedules.size", -1 do
      assert_changes "@article.status", from: "published", to: "draft" do
        ArticleSchedulesWorker.perform_async
        @article.reload
      end
    end
  end
end
