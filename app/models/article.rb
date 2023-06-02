# frozen_string_literal: true

class Article < ApplicationRecord
  validates :title, :description, presence: true
  validates :slug, presence: true, uniqueness: true
end
