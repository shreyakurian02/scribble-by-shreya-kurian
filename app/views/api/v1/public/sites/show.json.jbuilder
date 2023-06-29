# frozen_string_literal: true

json.site do
  json.extract! @site, :title
  json.is_password_protected @site.password_protected?
  json.is_valid_token @is_valid_token
end
