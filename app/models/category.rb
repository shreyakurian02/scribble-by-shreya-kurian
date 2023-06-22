# frozen_string_literal: true

class Category < ApplicationRecord
  MAXIMUM_NAME_LENGTH = 40
  DEFAULT_CATEGORY_NAME = "General"

  belongs_to :site

  has_many :articles

  validates :name, presence: true, uniqueness: { scope: :site_id }, length: { maximum: MAXIMUM_NAME_LENGTH },
    format: { with: Constants::ALPHANUMERIC_FORMAT_REGEX, message: I18n.t("errors.alphanumeric") }

  acts_as_list
end
