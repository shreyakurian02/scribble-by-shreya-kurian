# frozen_string_literal: true

class SeederService
  def process!
    create_site!
    create_user!
    create_categories_with_articles!
  end

  private

    def create_user!
      @user = @site.users.create! email: "oliver@example.com", first_name: "Oliver", last_name: "Smith"
    end

    def create_site!
      @site = Site.create! title: "Spinkart"
    end

    def create_categories_with_articles!
      Category.reset_column_information

      5.times do
        category = @site.categories.create!(name: Faker::Lorem.sentence(word_count: 2))
        create_articles!(category)
      end
    end

    def create_articles!(category)
      statuses = Article.statuses.values

      5.times do
        @user.articles.create! title: Faker::Lorem.word, description: Faker::Lorem.paragraph, status: statuses.sample,
          category:
      end
  end
end
