class Api::V1::Public::BaseController < ApplicationController
  include Authenticatable

  before_action :authenticate_using_x_auth_token, if: :is_authentication_required
end
