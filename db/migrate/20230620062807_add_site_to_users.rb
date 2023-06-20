# frozen_string_literal: true

class AddSiteToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :site, foreign_key: true, null: false, type: :uuid
  end
end
