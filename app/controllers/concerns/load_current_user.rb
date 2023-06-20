# frozen_string_literal: true

module LoadCurrentUser
  extend ActiveSupport::Concern

  private

    def load_current_user
      return if (@current_user = @site.users.first.presence)

      render_error(t("not_found", entity: "User"), :not_found)
    end
end
