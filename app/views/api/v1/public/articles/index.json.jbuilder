json.articles @articles do |article|
  json.extract! article, :id, :title, :slug
  json.matched_content article.as_json["matched_content"]
end
