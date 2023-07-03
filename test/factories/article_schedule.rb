# frozen_string_literal: true

FactoryBot.define do
  factory :article_schedule do
    datetime { DateTime.tomorrow }
    kind { "unpublish" }
    article
  end
end
