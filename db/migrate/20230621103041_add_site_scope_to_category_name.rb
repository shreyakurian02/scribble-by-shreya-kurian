# frozen_string_literal: true

class AddSiteScopeToCategoryName < ActiveRecord::Migration[7.0]
  def change
    remove_index :categories, :name
    add_index :categories, [:site_id, :name], unique: true
  end
end
