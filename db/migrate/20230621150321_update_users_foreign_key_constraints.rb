# frozen_string_literal: true

class UpdateUsersForeignKeyConstraints < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :users, :sites
    add_foreign_key :users, :sites, on_delete: :cascade
  end
end
