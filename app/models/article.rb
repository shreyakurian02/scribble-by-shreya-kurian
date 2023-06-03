# frozen_string_literal: true

class Article < ApplicationRecord
  MAXIMUM_TITLE_LENGTH = 80

  enum :status, { draft: "draft", published: "published" }, default: "draft"

  belongs_to :category, counter_cache: true
  belongs_to :author, class_name: "User", foreign_key: :author_id

  validates :title, presence: true, length: { maximum: MAXIMUM_TITLE_LENGTH }
  validates :description, presence: true
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug
  before_save :set_last_published_at

  private

    def set_last_published_at
      self.last_published_at = Time.zone.now() if published?
    end

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
end
