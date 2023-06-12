  # frozen_string_literal: true

  class Categories::DeletionService
    attr_reader :category, :move_to_category_id

    def initialize(category, move_to_category_id)
      @category = category
      @move_to_category_id = move_to_category_id
    end

    def process
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
        category.name == Category::DEFAULT_CATGEORY_NAME && last_category?
      end

      def last_category?
        Category.count == 1
      end

      def create_default_category_if_last
        if last_category?
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
        Category.create!(name: Category::DEFAULT_CATGEORY_NAME)
      end
  end
