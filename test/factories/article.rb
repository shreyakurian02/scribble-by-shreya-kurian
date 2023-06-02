# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { Faker::Lorem.sentence(word_count: 1) }
    description { Faker::Lorem.sentence }
    category
    association :author, factory: :user
  end
end
