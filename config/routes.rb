# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :v1 do

        resources :categories, only: %i[index create]
        resources :articles, except: %i[edit new], param: :slug

        namespace :bulk do
          resource :articles, only: %i[update destroy]
        end

      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
