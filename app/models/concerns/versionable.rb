# frozen_string_literal: true

module Versionable
  extend ActiveSupport::Concern

  private

    def set_paper_trail_event
      return self.paper_trail_event = "created" if versions.blank?
      return self.paper_trail_event = "restored" if paper_trail_event == "restored"
      return self.paper_trail_event = status if status_changed?

      "edited"
    end
end
