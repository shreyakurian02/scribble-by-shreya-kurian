# frozen_string_literal: true

class Redirection < ApplicationRecord
  VALID_FROM_PATH_REGEX = /\A\/[a-zA-Z0-9@:%._\-\\+~#&?\/=]*\z/i.freeze
  VALID_TO_PATH_REGEX =
    /\A(?:https?:\/\/)?(?:(?:www\.)?(?:(?:\d{1,3}\.){3}\d{1,3}|localhost|(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,})))?(?::\d+)?(?:\/[\w\-\/.]*)?(?:\?[\w\-\/=&]*)?\z/

  belongs_to :site

  validates :from_path, presence: true, uniqueness: { scope: :site_id }, format: { with: VALID_FROM_PATH_REGEX }
  validates :to_path, presence: true, format: { with: VALID_TO_PATH_REGEX }
  validates_with Validators::RedirectionValidator
end
