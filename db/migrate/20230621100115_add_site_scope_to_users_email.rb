# frozen_string_literal: true

class AddSiteScopeToUsersEmail < ActiveRecord::Migration[7.0]
  def change
    remove_index :users, :email
    add_index :users, [:site_id, :email], unique: true
  end
end
