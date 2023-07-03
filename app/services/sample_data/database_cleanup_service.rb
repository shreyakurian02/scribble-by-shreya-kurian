# frozen_string_literal: true

module SampleData
  class DatabaseCleanupService
    def process!
      DatabaseCleaner.clean_with :truncation
    end
  end
end
