 # frozen_string_literal: true

 module Validators
   class ScheduleDatetimeValidator < ActiveModel::Validator
     def validate(record)
       future_datetime(record)
       unpublish_schedule(record)
       publish_schedule(record)
     end

     private

       def future_datetime(record)
         return if record.datetime > DateTime.current

         record.errors.add(:datetime, I18n.t("errors.future_date"))
         throw(:abort)
       end

       def unpublish_schedule(record)
         return unless record.article.draft? && record.unpublish?
         return invalid_schedule(record) unless record.article.publish_schedule.present?

         invalid_schedule_datetime(record) if record.datetime <= record.article.publish_schedule.datetime
        end

       def publish_schedule(record)
         return unless record.article.published? && record.publish?
         return invalid_schedule(record) unless record.article.unpublish_schedule.present?

         invalid_schedule_datetime(record) if record.datetime <= record.article.unpublish_schedule.datetime
        end

       def invalid_schedule(record)
         record.errors.add(
           :base,
           I18n.t("errors.invalid_schedule", kind: inverse_kind(record), status: record.article.status))
         throw(:abort)
       end

       def invalid_schedule_datetime(record)
         record.errors.add(:datetime, I18n.t("errors.invalid_schedule_datetime", kind: inverse_kind(record)))
         throw(:abort)
      end

       def inverse_kind(record)
         record.unpublish? ? ArticleSchedule.kinds["publish"] : ArticleSchedule.kinds["unpublish"]
       end
   end
 end
