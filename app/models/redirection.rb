# frozen_string_literal: true

class Redirection < ApplicationRecord
  VALID_FROM_PATH_REGEX = /\A\/[a-zA-Z0-9@:%._\-\\+~#&?\/=]*\z/i.freeze
  VALID_TO_PATH_REGEX =
    /\A(?:https?:\/\/)?(?:(?:www\.)?(?:(?:\d{1,3}\.){3}\d{1,3}|localhost|(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,})))?(?::\d+)?(?:\/[\w\-\/.]*)?(?:\?[\w\-\/=&]*)?\z/

  belongs_to :site

  validates :from_path, presence: true, uniqueness: { scope: :site_id }, format: { with: VALID_FROM_PATH_REGEX }
  validates :to_path, presence: true, format: { with: VALID_TO_PATH_REGEX }
  validate :validate_redirection

  private

    def validate_redirection
      errors.add(:to_path, I18n.t("errors.same_path")) if from_path == shortened_to_path

      if redirections_with_to_path_same_as_from_path.where(from_path: shortened_to_path).present?
        errors.add(:to_path, I18n.t("errors.loop"))
      else
        errors.add(
          :to_path,
          I18n.t("errors.chain_path", path: "from")) if site.redirections.exists? from_path: shortened_to_path
        errors.add(
          :from_path,
          I18n.t("errors.chain_path", path: "to")) if redirections_with_to_path_same_as_from_path.present?
      end
    end

    def redirections_with_to_path_same_as_from_path
      site.redirections.where(
        "to_path = :from_path_with_host OR to_path = :from_path OR to_path = :from_path_with_dev_host", from_path_with_host:, from_path:, from_path_with_dev_host:)
    end

    def from_path_with_dev_host
      "http://127.0.0.1:3000#{from_path}"
    end

    def from_path_with_host
      "#{Rails.application.secrets[:host]}#{from_path}"
    end

    def shortened_to_path
      [app_host, "127.0.0.1"].include?(to_path_host) ? parsed_to_path.path : to_path
    end

    def app_host
      URI.parse(Rails.application.secrets[:host]).host
    end

    def parsed_to_path
      @_parsed_to_path ||= URI.parse(to_path)
    end

    def to_path_host
      parsed_to_path.host
    end
end
