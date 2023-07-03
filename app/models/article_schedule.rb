# frozen_string_literal: true

class ArticleSchedule < ApplicationRecord
  enum :kind, { publish: "publish", unpublish: "unpublish" }, default: "publish"

  belongs_to :article

  validates :datetime, presence: true
  validate :validate_schedule, on: :create
  validates_with Validators::ScheduleDatetimeValidator, if: -> { datetime.present? }

  before_validation :set_datetime, if: -> { datetime.present? }

  private

    def set_datetime
      self.datetime = datetime.to_datetime.strftime("%d-%m-%Y %H:%M:%S").in_time_zone("Kolkata")
    end

    def validate_schedule
      return unless article.publish_schedule.present? && publish? || article.unpublish_schedule.present? && unpublish?

      errors.add(:base, I18n.t("errors.schedule_exists"))
    end
end
