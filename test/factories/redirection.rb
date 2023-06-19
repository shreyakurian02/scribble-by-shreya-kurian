# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from_path { "/#{Faker::Internet.slug(glue: '-')}" }
    to_path { Faker::Internet.url }
    site
  end
end
