# frozen_string_literal: true

class CreateRedirections < ActiveRecord::Migration[7.0]
  def change
    create_table :redirections, id: :uuid do |t|
      t.string :from_path, null: false
      t.string :to_path, null: false
      t.references :site, null: false, foreign_key: true, type: :uuid
      t.index [:site_id, :from_path], unique: true
      t.timestamps
    end
  end
end
