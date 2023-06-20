# frozen_string_literal: true

module Articles
  class FilterService
    attr_reader :options, :current_user

    def initialize(current_user, options = {})
      @current_user = current_user
      @options = options
    end

    def process
      filter_by_status
      filter_by_category
      filter_by_search
      paginate
    end

    private

      def filter_by_status
        @articles = current_user.articles.send(status)
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

      def paginate
        { articles: @articles.page(page_number).per(per_page), filtered_count: @articles.size }
      end

      def categories
        options[:categories] || []
      end

      def search_term
        options[:search] || ""
      end

      def page_number
        options[:page_number]
      end

      def per_page
        options[:per_page]
      end
  end
end
