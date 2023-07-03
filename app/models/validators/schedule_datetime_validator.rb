 # frozen_string_literal: true

 module Validators
   class ScheduleDatetimeValidator < ActiveModel::Validator
     def validate(record)
       return unless record.new_record? || record.changed?

       future_datetime(record)
       unpublish_schedule(record) if record.unpublish?
       publish_schedule(record) if record.publish?
     end

     private

       def future_datetime(record)
         return if record.datetime > DateTime.current

         record.errors.add(:datetime, I18n.t("errors.future_date"))
         throw(:abort)
       end

       def unpublish_schedule(record)
         if record.article.published?
           return unless record.article.publish_schedule.present?

           invalid_schedule_datetime(record) if record.datetime > record.article.publish_schedule.datetime
         else
           return invalid_schedule(record) unless record.article.publish_schedule.present?

           invalid_schedule_datetime(record, false) if record.datetime <= record.article.publish_schedule.datetime
         end
        end

\
       def publish_schedule(record)
         if record.article.draft?
           return unless record.article.unpublish_schedule.present?

           invalid_schedule_datetime(record, false) if record.datetime > record.article.unpublish_schedule.datetime
         else
           return invalid_schedule(record) unless record.article.unpublish_schedule.present?

           invalid_schedule_datetime(record) if record.datetime <= record.article.unpublish_schedule.datetime
         end
       end

       def article_schedules_exists?(record)
         record.article.article_schedules.exists?(id: record.id)
       end

       def invalid_schedule(record)
         record.errors.add(
           :base,
           I18n.t("errors.invalid_schedule", kind: inverse_kind(record), status: record.article.status))
         throw :abort
       end

       def invalid_schedule_datetime(record, publish_later = true)
         message = publish_later ?
           I18n.t("errors.publish_schedule_later_than_unpublish_schedule") :
           I18n.t("errors.unpublish_schedule_later_than_publish_schedule")
         record.errors.add(:datetime, message)
         throw :abort
      end

       def inverse_kind(record)
         record.unpublish? ? ArticleSchedule.kinds["publish"] : ArticleSchedule.kinds["unpublish"]
       end
   end
 end
