# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { Faker::Lorem.sentence(word_count: 2) }
    description { Faker::Lorem.sentence }
    status { "published" }
    category
    user
  end
end
