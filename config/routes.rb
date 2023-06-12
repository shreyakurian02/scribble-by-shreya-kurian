# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :v1 do

        resources :categories, only: %i[index create destroy] do
          patch :reorder, on: :member
        end

        resources :articles, except: %i[edit new], param: :slug
        resources :redirections, except: %i[new show edit]
        resource :site, only: %i[show update]

        namespace :bulk do
          resource :articles, only: %i[update destroy]
        end

      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
