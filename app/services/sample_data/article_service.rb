# frozen_string_literal: true

module SampleData
  class ArticleService < BaseService
    def process!
      create_articles!
    end

    private

      def create_articles!
        statuses = Article.statuses.values

        site.categories.find_each do |category|
          5.times do
            current_user.articles.create! category:, title: Faker::Lorem.word, description: Faker::Lorem.paragraph,
              status: statuses.sample
          end
        end
      end
  end
end
