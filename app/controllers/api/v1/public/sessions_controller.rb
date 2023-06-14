# frozen_string_literal: true

class Api::V1::Public::SessionsController < ApplicationController
  before_action :load_site, only: :create

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
