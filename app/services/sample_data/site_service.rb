# frozen_string_literal: true

module SampleData
  class SiteService
    def process!
      create_site!
    end

    private

      def create_site!
        Site.create! title: "Spinkart"
      end
  end
end
