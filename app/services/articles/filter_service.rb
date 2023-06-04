# frozen_string_literal: true

module Articles
  class FilterService
    attr_reader :options

    def initialize(options = {})
      @options = options
    end

    def process
      filter_by_status
      filter_by_category
      filter_by_search
    end

    private

      def filter_by_status
        @articles = Article.send(status)
      end

      def filter_by_category
        return if categories.empty?

        @articles = @articles.includes(:category).where(category: { name: categories })
      end

      def filter_by_search
        @articles = @articles.where("title ILIKE ?", "%#{search_term}%")
      end

      def status
        return options[:status] if Article.statuses.keys.include?(options[:status])

        "all"
      end

      def categories
        options[:categories] || []
      end

      def search_term
        options[:search] || ""
      end
  end
end
