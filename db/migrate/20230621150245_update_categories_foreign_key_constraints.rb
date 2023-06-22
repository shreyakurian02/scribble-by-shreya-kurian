# frozen_string_literal: true

class UpdateCategoriesForeignKeyConstraints < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :categories, :sites
    add_foreign_key :categories, :sites, on_delete: :cascade
  end
end
