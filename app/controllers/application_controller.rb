# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiExceptions
  include LoadSite

  before_action :set_current_user

  private

    def set_current_user
      @current_user = User.first
    end
end
