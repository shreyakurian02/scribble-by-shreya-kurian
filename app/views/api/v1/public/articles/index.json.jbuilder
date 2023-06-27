json.articles @articles do |article|
  json.extract! article, :id, :title, :slug
  json.matched_content article.matched_description_content(params[:search])
end
