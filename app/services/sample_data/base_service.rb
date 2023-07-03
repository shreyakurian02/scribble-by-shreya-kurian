# frozen_string_literal: true

module SampleData
  class BaseService
    attr_reader :site, :current_user

    def initialize
      @site = Site.first
      @current_user = site.users.first
    end
  end
end
