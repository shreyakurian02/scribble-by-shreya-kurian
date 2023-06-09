# frozen_string_literal: true

class Site < ApplicationRecord
  has_many :redirections, dependent: :destroy

  validates :title, presence: true, uniqueness: true,
    format: { with: Constants::ALPHANUMERIC_FORMAT_REGEX, message: I18n.t("errors.alphanumeric") }
end
