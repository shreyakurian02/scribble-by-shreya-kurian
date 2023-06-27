# frozen_string_literal: true

class MakeArticlesSlugNullable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :articles, :slug, true
  end
end
