desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "sample data has been added."
  end
end

def create_sample_data!
  puts 'Seeding with sample data...'
  create_site!
  create_user!
  create_categories_with_articles!
end

def create_user!
  @user = @site.users.create! email: 'oliver@example.com', first_name: 'Oliver', last_name: "Smith"
end

def create_site!
  @site = Site.create! title: 'Spinkart'
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
    @user.articles.create! title:Faker::Lorem.word, description:Faker::Lorem.paragraph, status:statuses.sample, category:
  end
end
