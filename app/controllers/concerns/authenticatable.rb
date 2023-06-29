# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  private

    def is_authentication_required
      @site.password_digest.present?
    end

    def authenticate_using_x_auth_token
      render_error(t("session.could_not_auth"), :unauthorized) unless is_valid_token
    end

    def is_valid_token
      auth_token = request.headers["X-Auth-Token"].presence
      auth_token.present? &&
        (ActiveSupport::SecurityUtils.secure_compare(@site.authentication_token, auth_token))
    end
end
