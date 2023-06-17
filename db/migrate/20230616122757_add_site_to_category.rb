# frozen_string_literal: true

class AddSiteToCategory < ActiveRecord::Migration[7.0]
  def change
    add_reference :categories, :site, foreign_key: true, null: false, type: :uuid
  end
end
