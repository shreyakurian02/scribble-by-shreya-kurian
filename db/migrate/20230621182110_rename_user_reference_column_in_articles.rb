# frozen_string_literal: true

class RenameUserReferenceColumnInArticles < ActiveRecord::Migration[7.0]
  def change
    remove_reference :articles, :author, foreign_key: { to_table: :users }, type: :uuid
    add_reference :articles, :user, foreign_key: { on_delete: :cascade }, null: false, type: :uuid
  end
end
