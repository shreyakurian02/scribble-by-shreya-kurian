# frozen_string_literal: true

class Site < ApplicationRecord
  MINIMUM_PASSWORD_LENGTH = 6

  has_many :redirections, dependent: :destroy

  validates :title, presence: true, uniqueness: true,
    format: { with: Constants::ALPHANUMERIC_FORMAT_REGEX, message: I18n.t("errors.alphanumeric") }
  validates :password, length: { minimum: MINIMUM_PASSWORD_LENGTH }, if: -> { password.present? }

  after_update :update_authentication_token, if: :saved_change_to_password_digest?

  has_secure_password validations: false
  has_secure_token :authentication_token

  def password_protected?
    password_digest.present?
  end

  private

    def update_authentication_token
      self.regenerate_authentication_token
    end
end
