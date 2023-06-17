# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :load_redirection, only: :index
  before_action :redirect, only: :index

  def index
    render
  end

  private

    def redirect
      redirect_to redirection_url, status: :moved_permanently, allow_other_host: true if @redirection
    end

    def load_redirection
      @redirection = @site.redirections.find_by(from_path: request.fullpath)
    end

    def redirection_url
      is_host_present = URI.parse(@redirection.to_path).host.present?
      return @redirection.to_path if is_host_present

      "#{request.base_url}#{@redirection.to_path}"
   end
end
