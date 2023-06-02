# frozen_string_literal: true

class Category < ApplicationRecord
  MAXIMUM_NAME_LENGTH = 40

  has_many :articles

  validates :name, presence: true, uniqueness: true, length: { maximum: MAXIMUM_NAME_LENGTH }
end
