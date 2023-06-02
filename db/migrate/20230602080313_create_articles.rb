# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles, id: :uuid do |t|
      t.string :title, null: false
      t.string :slug, null: false, index: { unique: true }
      t.text :description, null: false
      t.timestamps
    end
  end
end
