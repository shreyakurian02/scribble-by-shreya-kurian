  # frozen_string_literal: true

  class Categories::DeletionService
    attr_reader :category, :move_to_category_id, :site

    def initialize(site, category, move_to_category_id = nil)
      @site = site
      @category = category
      @move_to_category_id = move_to_category_id
    end

    def process!
      Category.transaction do
        check_for_default_category_deletion!
        create_default_category_if_last
        update_articles!
        delete_category!
      end
    end

    private

      def check_for_default_category_deletion!
        raise ArgumentError.new(I18n.t("errors.default_category_deletion")) if default_category_deletion?
      end

      def default_category_deletion?
        category.name == Category::DEFAULT_CATEGORY_NAME && last_category?
      end

      def last_category?
        site.categories.size == 1
      end

      def create_default_category_if_last
        if last_category? && category.articles.exists?
          default_category = create_default_category!
          @move_to_category_id = default_category.id
        end
      end

      def update_articles!
        category.articles.each do |article|
          article.update!(category_id: move_to_category_id)
        end
      end

      def delete_category!
        category.destroy!
      end

      def create_default_category!
        site.categories.create!(name: Category::DEFAULT_CATEGORY_NAME)
      end
  end
