# frozen_string_literal: true

module Sluggable
  extend ActiveSupport::Concern

  included do
    before_save :set_slug, if: :published_for_the_first_time?
  end

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug ~* ?"
      latest_task_slug = Article.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_task_slug.present?
        slug_count = latest_task_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      errors.add(:slug, I18n.t("slug.immutable")) if slug_changed? && self.persisted?
    end

    def published_for_the_first_time?
      slug.nil? && published?
    end
end
