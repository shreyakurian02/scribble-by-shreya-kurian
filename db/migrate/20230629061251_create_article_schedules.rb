# frozen_string_literal: true

class CreateArticleSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :article_schedules, id: :uuid do |t|
      t.references :article, null: false, type: :uuid, foreign_key: { on_delete: :cascade }, index: true
      t.datetime :datetime, null: false
      t.string :kind, default: "publish", null: false
      t.timestamps
    end
  end
end
