# frozen_string_literal: true

class Articles::ScheduleService
  def process!
    ArticleSchedule.includes(:article).where("datetime < ?", DateTime.current).find_each do |schedule|
      status = schedule.unpublish? ? Article.statuses["draft"] : Article.statuses["published"]
      schedule.article.update!(status:)
      schedule.destroy!
    end
  end
end
