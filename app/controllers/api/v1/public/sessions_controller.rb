# frozen_string_literal: true

class Api::V1::Public::SessionsController < Api::V1::Public::BaseController
  skip_before_action :authenticate_using_x_auth_token

  def create
    unless @site.authenticate(login_params[:password])
      render_error(t("session.incorrect_credentials"), :unauthorized)
    end
  end

  private

    def login_params
      params.require(:login).permit(:password)
    end
end
