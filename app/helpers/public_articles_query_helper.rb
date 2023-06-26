# frozen_string_literal: true

module PublicArticlesQueryHelper
  def filter_by_search_in_title_and_description(published_articles, search_term)
    content_match_query = "substring(REGEXP_REPLACE(description, '<[^>]+>', '', 'g'), '(?i)(#{search_term}([^ ]* ){0,3})') as matched_content"
    published_articles.select("articles.*, #{content_match_query}")
      .where("description ILIKE :search OR title ILIKE :search", search: "%#{search_term}%")
  end
end
