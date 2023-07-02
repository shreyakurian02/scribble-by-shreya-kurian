# frozen_string_literal: true

class ArticleSchedulesWorker
  include Sidekiq::Worker

  def perform
    Articles::ScheduleService.new.process!
  end
end
