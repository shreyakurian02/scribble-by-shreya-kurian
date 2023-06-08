# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :site

  validates :from_path, presence: true, uniqueness: { scope: :site_id }
  validates :to_path, presence: true
  validate :is_redirection_valid?

  private

    def is_redirection_valid?
      errors.add(:to_path, I18n.t("errors.same_path")) if to_path == from_path

      if site.redirections.exists? to_path, from_path
        errors.add(:to_path, I18n.t("errors.loop"))
      else
        errors.add(:to_path, I18n.t("errors.chain_path", path: "from")) if site.redirections.exists? from_path: to_path
        errors.add(:from_path, I18n.t("errors.chain_path", path: "to")) if site.redirection.exists? to_path: from_path
      end
    end
end
