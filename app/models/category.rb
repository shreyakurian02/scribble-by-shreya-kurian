# frozen_string_literal: true

class Category < ApplicationRecord
  MAXIMUM_NAME_LENGTH = 40

  has_many :articles

  validates :name, presence: true, uniqueness: true, length: { maximum: MAXIMUM_NAME_LENGTH },
    format: { with: Constants::ALPHANUMERIC_FORMAT_REGEX, message: I18n.t("errors.alphanumeric") }
end
