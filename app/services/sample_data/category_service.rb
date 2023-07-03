# frozen_string_literal: true

module SampleData
  class CategoryService < BaseService
    def process!
      create_categories!
    end

    private

      def create_categories!
        Category.reset_column_information

        5.times do
          site.categories.create!(name: Faker::Lorem.sentence(word_count: 2))
        end
      end
  end
end
