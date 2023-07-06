# frozen_string_literal: true

module LoadCurrentUser
  extend ActiveSupport::Concern

  private

    def current_user
      @_current_user ||= @site.users.first
    end
end
