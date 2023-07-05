# frozen_string_literal: true

module ApplicationHelper
  def get_user
    {
      user: User.first
    }
  end
end
