# frozen_string_literal: true

class CreateSites < ActiveRecord::Migration[7.0]
  def change
    create_table :sites, id: :uuid do |t|
      t.string :title, null: false, default: "Spinkart", index: { unique: true }
      t.timestamps
    end
  end
end
