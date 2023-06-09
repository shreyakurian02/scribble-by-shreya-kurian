# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  # parallelize(workers: :number_of_processors)

  def response_json
    response.parsed_body
  end

  def headers
    {
      Accept: "application/json",
      "Content_Type" => "application/json"
    }
  end
end
