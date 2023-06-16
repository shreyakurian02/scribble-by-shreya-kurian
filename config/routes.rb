# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :v1 do

        resources :categories, except: %i[new show edit]

        namespace :bulk do
          resource :articles, only: %i[update destroy]
        end

        namespace :public do
          resource :session, only: :create
          resources :categories, only: :index
          resources :articles, only: :show, param: :slug
        end

        resources :articles, except: %i[edit new], param: :slug
        resources :redirections, except: %i[new show edit]
        resource :site, only: %i[show update]
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
