# frozen_string_literal: true

class Api::V1::Public::SitesController < Api::V1::Public::BaseController
  skip_before_action :authenticate_using_x_auth_token

  def show
    @is_valid_token = is_valid_token
  end
end
