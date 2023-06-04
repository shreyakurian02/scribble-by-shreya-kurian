# frozen_string_literal: true

json.extract! article, :id, :title, :description, :last_published_at, :status, :slug
json.author article.author.name
