# frozen_string_literal: true

json.version do
  json.extract! @version, :title, :description
  json.category @version.category.name
end
