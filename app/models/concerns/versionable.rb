# frozen_string_literal: true

module Versionable
  extend ActiveSupport::Concern

  included do
    before_save :set_paper_trail_event
    before_destroy :delete_article_versions
  end

  private

    def delete_article_versions
      versions.destroy_all
    end

    def set_paper_trail_event
      return if paper_trail_event == "restored"
      return self.paper_trail_event = "created" if versions.blank?
      return self.paper_trail_event = status == "draft" ? "drafted" : status if status_changed?

      self.paper_trail_event = "edited"
    end
end
