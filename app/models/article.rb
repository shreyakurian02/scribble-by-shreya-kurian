# frozen_string_literal: true

class Article < ApplicationRecord
  include Versionable
  include Sluggable

  scope :search_by_term_in_title_and_description, ->(search) {
 where("description ILIKE :search OR title ILIKE :search", search: "%#{search}%") }

  MAXIMUM_TITLE_LENGTH = 80

  enum :status, { draft: "draft", published: "published" }, default: "draft"

  belongs_to :category, counter_cache: true
  belongs_to :user

  validates :description, presence: true
  validates :slug, uniqueness: true
  validate :slug_not_changed
  validates :title, presence: true, length: { maximum: MAXIMUM_TITLE_LENGTH },
    format: { with: Constants::ALPHANUMERIC_FORMAT_REGEX, message: I18n.t("errors.alphanumeric") }

  before_create :set_slug
  before_save :set_last_published_at

  has_paper_trail on: [:create, :update]

  def matched_description_content(search_term)
    description.gsub(/<[^>]+>/, "").scan(/(?i)(#{search_term}(?:[^ ]* ){0,3})/).flatten
  end

  private

    def set_last_published_at
      self.last_published_at = Time.zone.now() if status_changed? && published?
    end

    def slug_not_changed
      errors.add(:slug, I18n.t("slug.immutable")) if slug_changed? && self.persisted?
    end
end
