# frozen_string_literal: true

json.redirections @redirections do |redirection|
  json.extract! redirection, :from_path, :to_path, :id
end
