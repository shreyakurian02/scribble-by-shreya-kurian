# frozen_string_literal: true

module Categories
  class FilterService
    attr_reader :options, :site

    def initialize(site, options = {})
      @site = site
      @options = options
    end

    def process
      site.categories.where("name ILIKE ?", "%#{search_term}%").order(:position)
    end

    private

      def search_term
        options[:search] || ""
      end
  end
end
