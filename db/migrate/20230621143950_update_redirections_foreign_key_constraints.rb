# frozen_string_literal: true

class UpdateRedirectionsForeignKeyConstraints < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :redirections, :sites
    add_foreign_key :redirections, :sites, on_delete: :cascade
  end
end
