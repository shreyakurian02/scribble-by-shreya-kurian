# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :site

  validates :from_path, presence: true, uniqueness: { scope: :site_id }
  validates :to_path, presence: true
  validate :validate_redirection

  private

    def validate_redirection
      errors.add(:to_path, I18n.t("errors.same_path")) if urls_equal? || paths_equal_if_host_nil?

      if site.redirections.exists? from_path: to_path, to_path: from_path
        errors.add(:to_path, I18n.t("errors.loop"))
      else
        errors.add(:to_path, I18n.t("errors.chain_path", path: "from")) if site.redirections.exists? from_path: to_path
        errors.add(:from_path, I18n.t("errors.chain_path", path: "to")) if site.redirections.exists? to_path: from_path
      end
    end

    def urls_equal?
      to_path_host_same_as_app_host? && paths_equal?
    end

    def paths_equal_if_host_nil?
      to_path_host.nil? && paths_equal?
    end

    def paths_equal?
      parsed_to_path.path == from_path
    end

    def to_path_host_same_as_app_host?
      to_path_host == Rails.application.secrets[:host]
    end

    def parsed_to_path
      @_parsed_to_path ||= URI.parse(to_path)
    end

    def to_path_host
      parsed_to_path.host
    end
end
