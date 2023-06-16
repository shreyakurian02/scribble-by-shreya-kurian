# frozen_string_literal: true

module Categories
  class FilterService
    attr_reader :options

    def initialize(options = {})
      @options = options
    end

    def process
      Category.where("name ILIKE ?", "%#{search_term}%").order(:position)
    end

    private

      def search_term
        options[:search] || ""
      end
  end
end
