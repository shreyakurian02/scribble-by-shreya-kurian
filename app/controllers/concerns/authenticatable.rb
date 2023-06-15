# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  private

    def is_authentication_required
      @site.password_digest.present?
    end

    def authenticate_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].presence
      is_valid_token = auth_token.present? &&
        (ActiveSupport::SecurityUtils.secure_compare(@site.authentication_token, auth_token))

      unless is_valid_token
        render_error(t("session.could_not_auth"), :unauthorized)
      end
    end
end
