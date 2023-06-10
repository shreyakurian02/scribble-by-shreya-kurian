# frozen_string_literal: true

class AddPasswordDigestToSite < ActiveRecord::Migration[7.0]
  def change
    add_column :sites, :password_digest, :string
    add_column :sites, :authentication_token, :string
  end
end
