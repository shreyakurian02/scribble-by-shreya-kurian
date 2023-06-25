# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :v1 do
        resources :categories, except: %i[new show edit]
        resources :redirections, except: %i[new show edit]
        resource :site, only: %i[show update]

        resources :articles, except: %i[edit new], param: :slug do
          resources :versions, only: %i[show], module: :articles do
            put "restore", on: :member
          end
        end

        namespace :bulk do
          resource :articles, only: %i[update destroy]
        end

        namespace :public do
          resource :session, only: :create
          resources :categories, only: :index
          resources :articles, only: %i[index show], param: :slug
        end
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
