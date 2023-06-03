# frozen_string_literal: true

class AddArticlesCountToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :articles_count, :integer
    Category.ids.each { |id| Category.reset_counters(id, :articles) }
  end
end
